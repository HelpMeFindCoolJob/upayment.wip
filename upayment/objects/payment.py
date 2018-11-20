""" Базовый объект, представляющий едеиницу платежа в системе """

from upayment.models import Payment

class PaymentObj:
    def create(self, **data):
        payment_instance = Payment(
            payment_date=data['payment_date'],
            client_full_name=data['client_full_name'],
            account_id_internet=data['account_id_internet'],
            account_id_phone=data['account_id_phone'],
            client_address=data['client_address'],
            bank_comment=data['bank_comment'],
            internet_payment=data['internet_payment'],
            monthly_phone_payment=data['monthly_phone_payment'],
            mg_mn_payment=data['mg_mn_payment'],
            equip_payment=data['equip_payment'],
            reinstall_payment=data['reinstall_payment'],
            other_payment=data['other_payment'],
            unknown_payment=data['unknown_payment'],
            total=data['total'],
            is_complited=False,
            in_invoice=data['in_invoice']
        )
        payment_instance.save()

    def get(self, payment_id):
        return Payment.objects.get(id=payment_id)

    def get_all(self):
        return Payment.objects.all()