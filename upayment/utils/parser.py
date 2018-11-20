""" Модуль парсера загруженных файлов банковских выписок """

import re, datetime, pathlib
from xlrd import open_workbook
from datetime import datetime
from decimal import Decimal
from upayment.utils.client_detective import Detective
from upayment.models import Internet_tarif, Phone_tarif, Payment, Connection_to_UTM_settings, SBRParserProfile
from upayment.utils.payment_worker import PaymentWorker
from upayment.utils.tarifs_worker import TarifsWorker

class Parser(Detective):
    def __init__(self):
        Detective.__init__(self)
        self.all_inv_int_pays = Decimal(0.00)
        self.all_inv_ph_pays = Decimal(0.00)
        self.all_inv_mgmn_pays = Decimal(0.00)
        self.all_inv_equip_pays = Decimal(0.00)
        self.all_inv_reinst_pays = Decimal(0.00)
        self.all_inv_other_pays = Decimal(0.00)
        self.count_inv_pays = 0
        self.total_inv_pays = Decimal(0.00)

    def work_on_file(self, file, invoice_worker, payment_worker, tarif_worker, profile_type, profile_id):
        """
        Осуществаляет всеобъемлющую обработку загружаемой из файла банковской выписки. А именно - идентифицирует по формату 
        загруженного файла тип банка (Сбербанк или Возрождение), далее парсит файл и подготавливает
        информацию из загруженной выписке для обработки, идентифицирует пользвателей, фигурирующих в данной выписке,
        идентифицирует платежи килентов из загружемой банковской выписки и создает на их основе объекты платежей (Payment),
        на соновании которых создает объект выписки (Invoice), после чего завершает свою работу.
        """
        bank = 'СБР' if profile_type == 'sbr' else 'ВЗР' # Определяем тип банка по типу профиля
        if bank == 'СБР':
            uploaded_data_from_file = self._parse_clients_data_from_sbr(invoice_file=file, profile=profile_id)
        else:
            uploaded_data_from_file = self._parse_clients_data_from_vzr(invoice_file=file)
        detected_clients = self.detect_clients(uploaded_data_from_file)
        temp_invoice_obj = self._create_invoice(bank_id=bank, worker=invoice_worker)
        for client in detected_clients:
            # Создать объекты платежей Pyamnet для каждого заплатившего в банке клиента
            self._create_payment(client_info=client, invoice_worker=payment_worker, tarif_worker=tarif_worker, invoice_obj=temp_invoice_obj)
        # Обновить данные о платежах в выписке (Invoice)
        self._update_invoice_payments(temp_invoice_obj, invoice_worker,
            self.all_inv_int_pays, self.all_inv_ph_pays, self.all_inv_mgmn_pays, self.all_inv_equip_pays,
            self.all_inv_reinst_pays, self.all_inv_other_pays, self.total_inv_pays, self.count_inv_pays            
        )

    def _parse_clients_data_from_sbr(self, invoice_file, profile):
        """
        Парсит входной файл выписки, содержайщий все данные о платежах в Сбербанк.
        Возвращает словарь со списками имен, адресов, комментариев, дат платежей и сумм платежей клиентов.
        """        
        invoice_data = {
            'names' : [],
            'addrs' : [],
            'comments' : [],
            'dates' : [],
            'summs' : []
        }
        curr_profile = SBRParserProfile.objects.get(id=profile)

        for line in invoice_file:                        
            splited_line = line.decode('utf8').split(';')
            if len(splited_line) == 12:
                invoice_data['names'].append(splited_line[curr_profile.name_position])
                invoice_data['addrs'].append(splited_line[curr_profile.address_position])
                invoice_data['comments'].append(splited_line[curr_profile.comment_position])
                invoice_data['dates'].append(self._get_payment_datetime(
                    day=splited_line[curr_profile.date_position], time=splited_line[curr_profile.time_position]))
                invoice_data['summs'].append(Decimal(splited_line[curr_profile.summ_position].replace(',', '.')))
        return invoice_data  

    def _parse_clients_data_from_vzr(self, invoice_file):
        """
        Парсит входной файл выписки, содержайщий все данные о платежах в банк Возрождение.
        Возвращает словарь со списками имен, адресов, комментариев, дат платежей и сумм платежей клиентов.
        """
        invoice_data = {
            'names' : [],
            'addrs' : [],
            'comments' : [],
            'dates' : [],
            'summs' : []
        }
        return invoice_data
    
    def _create_invoice(self, bank_id, worker):
        """
        Создает и возвращает объект выписки (Invoice) в статусе 'uploaded', содержащий в себе суммы всех платежей из банковской выписки.
        На вход получает список всех платежей из загруженной банковской выписке
        """
        return worker.get_template_inv(bank=bank_id)

    def _update_invoice_payments(self, invoice_obj, worker, 
        inet_pays, ph_pays, mgmn_pays, equip_pays, reinst_pays, other_pays, total_pays, pays_count):
        """
        Правит в переданном объекте выписки (invoice_obj) поля с суммами платежей по категориям.
        """
        worker.update_stat_inv(invoice_obj, 
            inet_pays, ph_pays, mgmn_pays, equip_pays, reinst_pays, other_pays, total_pays, pays_count)

    def _create_payment(self, client_info, invoice_worker, tarif_worker, invoice_obj):
        """
        Создает и возвращает объект платежа (Payment), для идентификации типа платежа вызывает detect_payment, передавая тому
        данные о клиенте, полученные при помощи detect_clients. На вход получает объект-рабочий (payment_worker), позволяющий
        производить основные действия над объектами Payment, и объект выписки (Invoice), необходимый для привязки платежа
        к конкретной выписке.
        """
        inet_acc, phone_acc, name, addr, comm, date, summ = client_info.split('|')
        inet, phone, mgmn, equip, reinst, other, unkwn, total = self.detect_payments(name, inet_acc, phone_acc, comm, summ, tarif_worker)
        
        # Собираем данные для передачи payment_worker-у
        payment_data = date, name, inet_acc, phone_acc, addr, comm, inet, phone, mgmn, equip, reinst, other, unkwn, total
        invoice_worker.create_payment(payment_data=payment_data, invoice=invoice_obj)        
        # Обновляем категории сумм по объекту выписки
        self.all_inv_int_pays += inet
        self.all_inv_ph_pays += phone
        self.all_inv_mgmn_pays += mgmn
        self.all_inv_equip_pays += equip
        self.all_inv_reinst_pays += reinst
        self.all_inv_other_pays += other
        self.count_inv_pays += 1
        self.total_inv_pays += total

    def _get_payment_datetime(self, day, time):
        """
        Преобразует дату и время платежа, полученные из банковской выписки в объект datetime для передачи в объект Payment.
        Возвращает datetime
        """
        if len(day) != 10:
            # Предполагаем, что дата пропарсилась с косяком декодирования и выглядит как-то так - '\ufeff25-07-2018'
            incorr_pattern = r'\d{2}-\d{2}-\d{4}'
            correct_day = re.findall(incorr_pattern, day)[0]
            return datetime.strptime('{0} {1}'.format(correct_day, time), '%d-%m-%Y %H-%M-%S')            
        return datetime.strptime('{0} {1}'.format(day, time), '%d-%m-%Y %H-%M-%S')
    
    def _reconize_bank(self, file):
        """
        По формату загружаемого файла определяет из какого банка получена загруженная выписка и 
        возвращает текстовую метку для каждого из банков - СБР или ВЗР.
        Некорректные форматы для файла отфильтровываются фронтэндом во время выбора файла.
        """
        suffix = pathlib.Path(file.name).suffix
        if suffix != '.xls' or suffix != '.xlsx':
            return 'СБР'    
        return 'ВЗР'