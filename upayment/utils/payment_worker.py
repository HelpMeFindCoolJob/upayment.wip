""" ОБъект, предоставляющий интерфейс для действий над PaymentObj """

from upayment.objects.payment import PaymentObj
from upayment.utils.utm_payment import UtmPayment

class PaymentWorker(PaymentObj):
    def __init__(self):
        self.utm_cli = UtmPayment()

    def pay(self, payments):
        self.utm_cli.do_pay(all_payments=payments)

    def get_in_invoice(self, invoice_id):
        return self.get_all().filter(in_invoice=invoice_id)

    def get_stats_for_invoice(self):
        pass

    def create_payment(self, payment_data, invoice):
        date, client, internet_acc, phone_acc, address, comment, internet_pay, phone_pay, \
        mgmn_pay, reinstall_pay, equip_pay, other_pay, unknown_pay, total = payment_data

        payment_obj = self.create(
            payment_date=date,
            client_full_name=client,
            account_id_internet=internet_acc,
            account_id_phone=phone_acc,
            client_address=address,
            bank_comment=comment,
            internet_payment=internet_pay,
            monthly_phone_payment=phone_pay,
            mg_mn_payment=mgmn_pay,
            equip_payment=equip_pay,
            reinstall_payment=reinstall_pay,
            other_payment=other_pay,
            unknown_payment=unknown_pay,
            total=total,
            is_complited=False,
            in_invoice=invoice
        )