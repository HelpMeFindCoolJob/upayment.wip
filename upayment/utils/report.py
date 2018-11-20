""" Create paymnets report """

import io, datetime

from decimal import Decimal
from django.core.exceptions import ObjectDoesNotExist
from django.core.files import File
from upayment.models import Invoice, Report, Payment

class ReportGenerator():
    def __init__(self, waiting_invoices):
        self.invoices_id = waiting_invoices.values_list('id', flat=True)
        self.payments = Payment.objects.filter(in_invoice__in=list(self.invoices_id))

    def generate_report(self):
        try:
            number_report = Report.objects.latest('id').number_report + 1
        except ObjectDoesNotExist as exc:
            number_report = 1

        if len(self.invoices_id) == 1:
            invoice = Invoice.objects.get(id=self.invoices_id[0])
            name_report = 'Отчет по - {0}'.format(invoice.name_invoice)
        else:
            date = datetime.datetime.now().strftime('%d-%m-%Y')
            name_report = 'Отчет по выпискам за {0}'.format(date)

        report = Report(
            number_report=number_report,
            name_report=name_report,
            operator='Секерина М.С.',  # ПОПРАВИТЬ НА НАСТОЯЩЕГО ПОЛЬЗОВАТЕЛЯ
            internet_sum=0.0,
            monthly_phone_sum=0.0,
            mg_mn_sum=0.0,
            equip_sum=0.0,
            phone_install_sum=0.0,
            phone_reinstall_sum=0.0
        )
        report.file.save('{0}.csv'.format(report.name_report), File(io.StringIO(self._create(self.payments))))
        report.save()

    def _create(self, payments):
        all_payments_str_obj = ''
        all_internet_payments = Decimal(0.0)
        all_monthly_phone_payments = Decimal(0.0)
        all_mg_mn_payments = Decimal(0.0)
        all_unknown_payments = Decimal(0.0)

        for payment in payments:
            all_payments_str_obj += '{0};{1};{3};{4};{5};{6};{7}\r'.format(
                payment.client_full_name, payment.account_id_internet, payment.account_id_phone, payment.client_address,
                payment.internet_payment, payment.monthly_phone_payment, payment.mg_mn_payment, payment.unknown_payment
            )
            all_internet_payments += payment.internet_payment
            all_monthly_phone_payments += payment.monthly_phone_payment
            all_mg_mn_payments += payment.mg_mn_payment
            all_unknown_payments += payment.unknown_payment

        all_payments_str_obj += ';;;;Итого платежи - Интернет;{0}\r'.format(all_internet_payments)
        all_payments_str_obj += ';;;;Итого платежи - Абонентская плата за телефон;{0}\r'.format(
            all_monthly_phone_payments
        )
        all_payments_str_obj += ';;;;Итого платежи - МГ/МН связь;{0}\r'.format(all_mg_mn_payments)
        all_payments_str_obj += ';;;;Итого платежи - Остальное;{0}\r'.format(all_unknown_payments)

        return all_payments_str_obj


# def generate_report():
#     invoices_id = Invoice.objects.filter(is_waiting=True).values_list('id', flat=True)
#     payments = Payment.objects.filter(in_invoice__in=list(invoices_id))
#
#     try:
#         number_report = Report.objects.latest('id').number_report + 1
#     except ObjectDoesNotExist as exc:
#         number_report = 1
#
#     if len(invoices_id) == 1:
#         invoice = Invoice.objects.get(id=invoices_id[0])
#         name_report = 'Отчет по - {0}'.format(invoice.name_invoice)
#     else:
#         date = datetime.datetime.now().strftime('%d-%m-%Y')
#         name_report = 'Отчет по выпискам за {0}'.format(date)
#
#
#     report = Report(
#         number_report=number_report,
#         name_report=name_report,
#         operator='Секерина М.С.', # ПОПРАВИТЬ НА НАСТОЯЩЕГО ПОЛЬЗОВАТЕЛЯ
#         internet_sum = 0.0,
#         monthly_phone_sum = 0.0,
#         mg_mn_sum=0.0,
#         equip_sum=0.0,
#         phone_install_sum=0.0,
#         phone_reinstall_sum=0.0
#     )
#     report.file.save('{0}.csv'.format(report.name_report), File(io.StringIO(_create(payments))))
#     report.save()
#
# def _create(payments):
#     all_payments_str_obj = ''
#     all_internet_payments = Decimal(0.0)
#     all_monthly_phone_payments = Decimal(0.0)
#     all_mg_mn_payments = Decimal(0.0)
#     all_unknown_payments = Decimal(0.0)
#
#     for payment in payments:
#         all_payments_str_obj += '{0};{1};{3};{4};{5};{6}\r'.format(
#             payment.client_full_name, payment.account_id, payment.client_address, payment.internet_payment,
#             payment.monthly_phone_payment, payment.mg_mn_payment, payment.unknown_payment
#         )
#         all_internet_payments += payment.internet_payment
#         all_monthly_phone_payments += payment.monthly_phone_payment
#         all_mg_mn_payments += payment.mg_mn_payment
#         all_unknown_payments += payment.unknown_payment
#
#     all_payments_str_obj += ';;;;Итого платежи - Интернет;{0}\r'.format(all_internet_payments)
#     all_payments_str_obj += ';;;;Итого платежи - Абонентская плата за телефон;{0}\r'.format(
#         all_monthly_phone_payments
#     )
#     all_payments_str_obj += ';;;;Итого платежи - МГ/МН связь;{0}\r'.format(all_mg_mn_payments)
#     all_payments_str_obj += ';;;;Итого платежи - Остальное;{0}\r'.format(all_unknown_payments)
#
#     return all_payments_str_obj