""" Базовый объект, представляющий банковскую выписку, содержащую информацию о платежа """

from upayment.models import Invoice
from decimal import Decimal

class InvoiceObj:
    def create(self, bank):
        invoice_instance = Invoice(
            bank_id=bank,
            internet_payments=Decimal(0.00),
            monthly_phone_payments=Decimal(0.00),
            mg_mn_payments=Decimal(0.00),
            equip_payments=Decimal(0.00),
            reinstall_payments=Decimal(0.00),
            other_payments=Decimal(0.00),
            total_payments=Decimal(0.00),
            payments_count=0
        )
        invoice_instance.save()
        invoice_instance.name_invoice = 'Выписка #{0} от {1}'.format( # Имя не нужно, переопределили же __str__
            invoice_instance.id, invoice_instance.creation_date
        )
        invoice_instance.save()

    def delete(self, invoice_id):
        self.get(invoice_id=invoice_id).delete()

    def get(self, invoice_id):
        return Invoice.objects.get(id=invoice_id)

    def get_all(self):
        return Invoice.objects.all()