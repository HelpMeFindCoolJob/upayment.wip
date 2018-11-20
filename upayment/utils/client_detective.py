"""
Модуль-детектив, который поможет определять лицевые счета и иную важную информацию о клиентах из ЮТМ-а, 
а также сопоставить их с информацией из загружаемых операторами банковских выписок.
"""

import re
from upayment.utils.utm_data import Data
from decimal import Decimal

class Detective(Data):
    """
    Объект, выполняющий действия, направленные на установление однозначности инормации о клиентах и их данных.
    То есть: Идентификацию пользователя, его лицевых счетов по ФИО и адресу из выписки.
    А также идентификацию платежей клиента из выписки и сопоставление их с лицевыми счетами клиента.
    """
    def __init__(self):
        Data.__init__(self)
        self.all_users_from_utm = self.get_clients_list()
        print('!--\r\nAll clients length from UTM - {}\r\n--!'.format(len(self.all_users_from_utm)))

    def detect_clients(self, user_data_from_uploaded):
        """
        Идентифицирует пользователей из загруженной банковской выписки (user_data_from_uploaded), путем сопоставления указанных
        в загруженной выписке данных клиента с данными клиентов из ЮТМ-а.
        Возвращает список идентифицированных клиентов из загруженной выписки в формате - 
        'Номер счета ИНТ|Номер счета ТЛФ|ФИО|Адрес|Комментарий банка|Сумма платежа из выписки'
        """
        clients = []
        invoice_clients = user_data_from_uploaded['names'] # Список имен клиентов из выписки
        clients_addresses = user_data_from_uploaded['addrs'] # Список адресов клиентов из выписки
        clients_comments = user_data_from_uploaded['comments'] # Список комментариев банка
        clients_dates = user_data_from_uploaded['dates'] # Список дат платежей из выписки
        clients_summs = user_data_from_uploaded['summs'] # Список сумм платежей из выписки

        for client, addr, comm, date, summ in zip(invoice_clients, clients_addresses, clients_comments, clients_dates, clients_summs):
                detected_clients = self._identify_client(client_name=client, address=addr)
                detected_accounts = self._compose_user_accounts(users_info=detected_clients, comment=comm)
                clients.append('{0}|{1}|{2}|{3}|{4}|{5}|{6}'.format(
                    detected_accounts[0], detected_accounts[1], client, addr, comm, date, summ
                ))
                # clients.append(detected_accounts[0], detected_accounts[1], client, addr, comm, date, summ)

        return clients

    def detect_payments(self, name, int_acc, phone_acc, comment, summ, tarif_worker):
        """
        Идентифицирует тип платежа на основании действующих тарифов на услуги (берет их из БД при помощи специального tarif_worker-а)
        и комментария оператора из загруженной банковской выписки (путем поиска совпадений в лицевых счетах и/или ключевых словах).
        Возвращает кортеж Decimal сумм платежей в формате - 'ИНТ, АБМТ, МГМН, ОБРД, ПРУ, ИНОЕ, НЕУЧТ'
        """     
        # Инициализируем стандартные значения из банковской выписки   
        inet_tarifs = tarif_worker.get_internet_prices()
        phone_tarifs = tarif_worker.get_phone_prices()
        pay_sum = summ.replace(',', '.')
        inet = phone = mgmn = equip = reinst = other = unkwn = total = Decimal(0.00)
        unkwn = total = Decimal(pay_sum)
        # Попробуем предположить, что если у клиента пристуствует только один лицевой счет за одну из услуг 
        # (Интернет или Телефонию), значит вся сумма платежа предназначена для оплаты услуг по этому счету
        if phone_acc == 'НЕТ' and int_acc != 'НЕТ':
            #  Предположим, что у клиента есть только счет с услугами Интернет
            inet = unkwn
            unkwn = Decimal(0.00)
            return inet, phone, mgmn, equip, reinst, other, unkwn, total
        elif int_acc == 'НЕТ' and phone_acc != 'НЕТ':
            # Предположим, что у клиента есть только счет с услугами Телефонии
            if unkwn - phone_tarifs[0] < 335:
                # Предположим, что клиент заплатил за месяц использования МТС а также за услуги МГМН
                phone = phone_tarifs[0]
                mgmn = unkwn - phone
                unkwn = Decimal(0.00)
                return inet, phone, mgmn, equip, reinst, other, unkwn, total
            # Мы точно знаем, что клиент может оплатить только за услуги Телефонии, но не знаем за какие конкретно,
            # поэтому предположим, что клиент в любом случае оплатил услугу МТС за один месяц, 
            # а остальное добавим в неизвестнык платежи
            phone = phone_tarifs[0]
            unkwn -= phone
            return inet, phone, mgmn, equip, reinst, other, unkwn, total
        # Сопоставляем сумму платежа, указанную в банковской выписке, с действующими тарифами на услуги
        if unkwn in inet_tarifs:
            # Предполагаем, что если сумма платежа совпадает со стоимостью одного из интернет тарифов,
            # значит сумма платежа из банковской выписки заплачена за один и месяц использования услугой Интернет
            inet = unkwn
            unkwn = Decimal(0.00)    
            return inet, phone, mgmn, equip, reinst, other, unkwn, total
        elif unkwn in phone_tarifs:
            # Предполагаем, что если сумма платежа совпдает со стоимостью одного из телефонных тарифов
            # (а он в принципе пока что один), значит сумма платежа из банковской выписки заплачена за один 
            # месяц использования услуги МТС     
            phone = unkwn
            unkwn = Decimal(0.00)
            return inet, phone, mgmn, equip, reinst, other, unkwn, total
        elif unkwn - phone_tarifs[0] in inet_tarifs:
            # Предполагаем, что если сумма платежа из банковской выписки минус единственный тариф за услуги МТС
            # совпадает с суммой любого интернет тарифа, значит целью платежа служили оплата услуг Интернет и МТС
            phone = phone_tarifs[0]
            inet = unkwn - phone
            unkwn = Decimal(0.00)
            return inet, phone, mgmn, equip, reinst, other, unkwn, total        
        elif [t for t in phone_tarifs if (unkwn / t) % 1 == 0]:
            # Попробуем выяснить не заплатил ли клиент за несколько месяцев использования услугой МТС, поскольку
            phone = unkwn
            unkwn = Decimal(0.00)
            return inet, phone, mgmn, equip, reinst, other, unkwn, total
        elif [t for t in inet_tarifs if (unkwn / t) % 1 == 0]:
            # Попробуем выяснить не заплатил лм клиент за несколько месяцев использования услугми Интернет
            inet = unkwn
            unkwn = Decimal(0.00)
            return inet, phone, mgmn, equip, reinst, other, unkwn, total    
        elif [t for t in inet_tarifs if (unkwn - t) > 0 and (unkwn - t) <= 21]:
            # Попробуем выяснить не заплатил ли клиент за услуги Интернет "ровную" сумму (например стоиость по тарифу - 579 рублей6,
            # а килент оплатил 580 или 600 рублей). Число 21 взято из расчета максимальной суммы до ровного счета (579 + 21 = 600)  
            inet = unkwn
            unkwn = Decimal(0.00)
            return inet, phone, mgmn, equip, reinst, other, unkwn, total 
        # Если по сумме платежа не ясно за какую услугу заплатил клиент, пробуем пропарсить комментарий на предмет начилия 
        # там лицевого счета в роли цели оплаты
        if comment.rstrip().isdigit():
            # Предположим, что оператор банка указал в комментарии номер лицевого счета, на который следует зачислить сумму
            if comment.rstrip() == int_acc:
                # Предполагаем, что, если номер счета из комментария совпал с номером счета клиента за Интернет,
                # значит целью платежа клиента была оплата интернет услуг 
                inet = unkwn
                unkwn = Decimal(0.00)
                return inet, phone, mgmn, equip, reinst, other, unkwn, total
            elif comment.rstrip() == phone_acc:
                # Предполагаем, что, если номер счета из комментария совпал с номером счета клиента за услуги МТС,
                # значит целью платежа клиента была оплата услуг Телефонии (МТС и МГМН)
                pass
                


        return inet, phone, mgmn, equip, reinst, other, unkwn, total
        
    def _identify_client(self, client_name, address=''):
        """
        Ищет совпадения ФИО и адреса клиента из списка UTM5 с ФИО и адресом, указанным в выписке.
        В случае совпадения возвращает список UTM-мных инфо-строк соответсвующего клиента.
        !!! Адрес необходим для идентификации полных тезок.
        Возвращает список совпавших клиентов в формате 
        '2506|net2490|Танасогло Надежда Вячеславовна|140730, Россия, Московская обл., г. Рошаль, ул. К. Маркса, 30б|20||46'.
        """
        found_accounts = []

        splited_name = client_name.lower().rstrip().split(' ')
        
        if len(splited_name) == 3:
            # Предполагаем, что у клиента в выписке указаны полные ФИО либо указана фамилия и инициалы
            inv_l_name, inv_f_name, inv_th_name = splited_name
            if len(inv_f_name.rstrip('.,/')) == 1 and len(inv_th_name.rstrip('.,/')) == 1:
                # Предполагаем, что имя отчество клиента указаны инициалами
                initials_name_pattern = r'[|]+{0}+\s+{1}\S+\s+{2}\S+[|]'.format(inv_l_name, inv_f_name.rstrip('.,/'), inv_th_name.rstrip('.,/'))
                found_accounts = [acc for acc in self.all_users_from_utm if re.findall(initials_name_pattern, acc.lower())]
                #
                # accs = self.compose_user_accounts(found_accounts)
            else:
                # Ищем пользователя из выписке в списке клиентов ЮТМ-а по полному ФИО                
                full_name_pattern = r'[|]+{0}+\s+{1}+\s+{2}[|]'.format(inv_l_name, inv_f_name, inv_th_name)
                found_accounts = [acc for acc in self.all_users_from_utm if re.findall(full_name_pattern, acc.lower())]
                #
                # accs = self.compose_user_accounts(found_accounts)
        elif len(splited_name) == 2:
            # Предполагаем, что у клиента есть только фамилия и имя либо оператор банка ошибочно заполнила данные, например указав
            # инициалы без пробела
            inv_l_name, inv_f_name = splited_name            
            if len(inv_f_name.rstrip('.,/')) == 1:
                # Предполагаем, что оператор банка указал только инициал имени из одной буквы
                name_pattern = r'[|]+{0}+\s+{1}+\S+[|]'.format(inv_l_name, inv_f_name.rstrip('.,/'))
                found_accounts = [acc for acc in self.all_users_from_utm if re.findall(name_pattern, acc.lower())]
            elif len(inv_f_name.rstrip('.,/')) == 2 and not inv_f_name == 'Ян':
                # Предполагаем, что оператор банка забыл разделить инициалы имени отчества пробелами
                inv_f_name, inv_th_name = inv_f_name
                full_name_pattern = r'[|]+{0}+\s+{1}\S+\s+{2}\S+[|]'.format(inv_l_name, inv_f_name, inv_th_name)
                found_accounts = [acc for acc in self.all_users_from_utm if re.findall(full_name_pattern, acc.lower())]
            elif len(inv_f_name) == 4 and inv_f_name[1] in '.,/':
                # Предполагаем, что оператор банка указал инициалы с точками или точкой без пробела между ними                
                temp_name = inv_f_name                
                inv_f_name = temp_name[0]
                inv_th_name = temp_name[2]
                name_pattern = r'[|]+{0}+\s+{1}\S+\s+{2}\S+[|]'.format(inv_l_name, inv_f_name, inv_th_name)
                found_accounts = [acc for acc in self.all_users_from_utm if re.findall(name_pattern, acc.lower())]
            else:
                # Предполагаем, что оператор указал полностью фамилию и имя клиента
                name_pattern = r'[|]+{0}+\s+{1}[|]'.format(inv_l_name, inv_f_name)
                found_accounts = [acc for acc in self.all_users_from_utm if re.findall(name_pattern, acc.lower())]
            
        return found_accounts

    def _compose_user_accounts(self, users_info, comment):
        """
        Однозначно определяет и компонует лицевые счета, из списка пользователей, идентифицированного при помощи метода 'identify_client()'.
        Возвращает список кортежей из номера счета услуг Интернет и номера счета услуг Телефонии в формате 
        '(Интернет счет, Телефония счет)'. В случае неоднозначности (например, когда под одним именем живет несколько аккаунтов) вместо
        номера счета вернет 'НЕОПР'. В случае отсутсвия счета по одной из услуг вернет 'НЕТ'
        """
        result = 'НЗВ', 'НЗВ'
        if not users_info:
            return result
        if len(users_info) == 1:
            # Предполагаем, что в ЮТМ у клиента есть лишь один аккаунт
            splited_info = users_info[0].split('|')
            tarif_id = splited_info[6].rstrip()
            if tarif_id == '66' or tarif_id == '65':
                # Предполагаем, что у клиента на данном лицевом счету имеется тариф только с телефонией
                # 65 - телефония юр. лица 66 - телефония физ. лица
                phone_account_id = splited_info[0]
                result = 'НЕТ', phone_account_id
            else:
                # У клиента на данном лицевом счету имеется тариф только с улугами Интернет
                internet_account_id = splited_info[0]
                result = internet_account_id, 'НЕТ'                
        elif len(users_info) == 2:
            # Предполагаем, что у килента есть два лицевых счета - один для Интернета, другой для Телефонии
            int_acc = phone_acc = 'НЕТ'
            for info in users_info:
                splited_info = info.split('|')
                tarif_id = splited_info[6].rstrip()
                if tarif_id == '66' or tarif_id == '65':
                    # Предполагаем, что у клиента на данном лицевом счету имеется тариф только с телефонией
                    # 65 - телефония юр. лица 66 - телефония физ. лица
                    if phone_acc != 'НЕТ':
                        # Видимо у клиента есть два лицевых счета по услугам Телефонии
                        phone_acc = 'ИГН'
                    else:
                        phone_acc = splited_info[0]
                else:
                    if int_acc != 'НЕТ':
                        # Видимо у клиента есть два лицевых счета по услугам Интернет
                        int_acc = 'ИГН'
                    else:
                        int_acc = splited_info[0]            
            result = int_acc, phone_acc                
        elif len(users_info) > 1:
            # Предполагаем, что у клиента есть несколько лицевых счетов с услугами. Причем возможны комбинации как одинаковых 
            # (Телефония + Телефони, например), так и различных
            inet_accounts = []
            phone_accunts = []
            for info in users_info:
                splited_info = info.split('|')
                tarif_id = splited_info[6].rstrip()
                if tarif_id == '66' or tarif_id == '65':
                    # Предполагаем, что у клиента на данном лицевом счету имеется тариф только с телефонией
                    # 65 - телефония юр. лица 66 - телефония физ. лица
                    phone_accunts.append(splited_info[0])
                else:
                    inet_accounts.append(splited_info[0])
            if len(inet_accounts) == 0:
                # Предположим у клиента есть более 2-х лицевых счетов с услугами Телефонии и нет ни одного
                # лицевого счета с услугами Интернет
                result = 'НЕТ', 'ИГН'
            elif len(phone_accunts) == 0:
                # Предположим у клиента есть более 2-х лицевых счетов с услугами Интренет и нет ниодного 
                # лицевого счета с услугами Телефонии
                result = 'ИГН', 'НЕТ'
            elif len(inet_accounts) == 1:
                # Предположим, что у клиента есть один лицевой счет для услуг Интернета и несколько лицевых
                # счетов с услугами Телефонии
                result = inet_accounts[0], 'ИГН'
            elif len(phone_accunts) == 1:
                # Предположим, что у клиента есть один лицевой счет для услуг Телефонии и несколько лицевых
                # счетов с услугами Интернет
                result = 'ИГН', phone_accunts[0]
        # Дополнительно попорбуем поискать неидентифицированные лицевые счета с помощью парсинга комментария
        # оператора из банковской выписки        
        if result[0] == 'ИГН' or result[0] == 'НЗВ':
            # Попробуем пропарсить коммент и идентифицировать лицевой счет для услуг Интернет
            name = users_info[0].split('|')[2]
            inet_acc_from_comment = self._get_account_id_from_comment(comment, name, 'inet')
            if inet_acc_from_comment != 'НЗВ':
                result = inet_acc_from_comment, result[1]
        if result[1] == 'ИГН' or result[1] == 'НЗВ':
            # Попробуем пропарсить коммент и идентифицировть лицевой счет для услуг Телефонии
            name = users_info[0].split('|')[2]
            phone_acc_from_comment = self._get_account_id_from_comment(comment, name, 'phone')
            if phone_acc_from_comment != 'НЗВ':
                result = result[0], phone_acc_from_comment
        return result

    def _get_account_id_from_comment(self, comment, client, service):
        """
        Приходит на выручку, когда не удалось уникально идентифицировать лицевые счета за услуги Интернета и Телефонии
        на основании данных из ЮТМ-а, пытаясь пропарсить комметарий оператора из банковской выписки. Возвращает строковое
        представление номера счета (например, '111'), в случае неудачи возвращает 'НЗВ'
        """
        contract_pattern_1 = r'[Nn]+[Ee]+[Tt]\s*\d{4}'
        contract_pattern_2 = r'дог?.+\d{2,4}'
        account_pattern = r'\d{3,4}'
        accounts_from_comment = re.findall(r'\d{3,4}', comment)
        # if len(re.findall(contract_pattern_1, comment)) == 1 or len(re.findall(contract_pattern_2, comment)) == 1:
        #     # Предположим, что в комментрии содержится информация о номере договора (он же ID ползователя в терминах ЮТМ-а)
        #     # вида (net1237)
        #     clients = [c for c in re.findall(contract_pattern_1, comment)]
        #     pass
        if len(accounts_from_comment) == 1:
            # Предположим, что в комментарии содержится информация о лицевом счете клиента
            acc = [inf for inf in self.all_users_from_utm if inf.split('|')[0] == accounts_from_comment[0]]
            splited_acc = acc[0].split('|')
            print(accounts_from_comment)
            print('--------')
            print(acc)
            last_name_from_comment = client.split(' ')[0].rstrip()
            last_name_from_utm = splited_acc[2].split(' ')[0].rstrip()
            tarif_id = splited_acc[6]
            if len(acc) == 1 and (last_name_from_comment == last_name_from_utm):
                # Если есть уникальное совпадение числа из комментария с лицевым счетом, а также совпадают фамилии
                # плательщика, предполагаем, что идентифицировали клиента
                if service == 'inet' and tarif_id != '65' and tarif_id != '66':
                    # Номер счета явно привязан к услугам Интернет
                    return splited_acc[0]
                elif service == 'phone' and (tarif_id == '65' or tarif_id == '66'):
                    # Номер счета явно привзан к услугам Телефонии
                    return splited_acc[0]
        return 'НЗВ'

