""" Класс, обеспечивающий базовый функционал логирования """

from upayment.models import Payment, LogPayment

class Log:
    def write_payment_info_in_log(self, payment, options, status):
        for option in options:     # Кортеж опций вида (account_id='3813', summ=Decimal('579.00'), type='ИНТ', utm_comment='ИНТ')
            if status == 0:
                payment_status = 'ОК'
            elif status == 255 or -1:
                payment_status = 'ОШИБКА'
            else:
                payment_status = 'ПРИОСТ'

            payment_info = LogPayment(
                client_full_name=payment.client_full_name,
                client_address=payment.client_address,
                account_id=option[0],
                bank_comment=payment.bank_comment,
                summ=option[1],
                pyament_type=option[2],
                payment_comment=option[3],
                payment_status=payment_status,
                in_invoice=payment.in_invoice
            )
            payment_info.save()

    def get_payment_info_from_log(self, invoice):
        return LogPayment.objects.filter(in_invoice=invoice)

    def delete_payment_info_from_log(self, invoice):
        LogPayment.objects.filter(in_invoice=invoice).delete()

