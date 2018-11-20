from collections import namedtuple
from datetime import datetime
from upayment.models import Invoice
from django.core.exceptions import ObjectDoesNotExist
# from .parser import Parser
from upayment.objects.invoice import InvoiceObj
from upayment.utils.payment_worker import PaymentWorker

class InvoiceWorker(InvoiceObj):
    def __init__(self):
        self.payment_worker = PaymentWorker()

    def get_inv_info(self):
        return {
            'uploaded_inv' : self.get_inv_by_state(self.get_inv_states().uploaded).objects,
            'uploaded_inv_count' : self.get_inv_by_state(self.get_inv_states().uploaded).objects_count,
            'waiting_inv' : self.get_inv_by_state(self.get_inv_states().waiting).objects,
            'waiting_inv_count' : self.get_inv_by_state(self.get_inv_states().waiting).objects_count,
            'processed_inv' : self.get_inv_by_state(self.get_inv_states().processed).objects,
            'processed_inv_count': self.get_inv_by_state(self.get_inv_states().processed).objects_count,
        }

    def get_inv_states(self):
        tup = namedtuple('states', ['uploaded', 'waiting', 'processed'])
        return tup('uploaded', 'waiting', 'processed')

    def get_bank_names(self):
        tup = namedtuple('banks', ['SBR', 'VZR'])
        return tup('СБР', 'ВЗР')

    def get_inv_by_state(self, state):
        tup = namedtuple('invoices', ['objects', 'objects_count'])
        inv = None
        if state == 'uploaded':
            inv = self.get_all().filter(is_loaded=True)
        elif state == 'waiting':
            inv = self.get_all().filter(is_waiting=True)
        elif state == 'processed':
            inv = self.get_all().filter(is_processed=True)
        print(tup(inv, inv.count()))
        return tup(inv, inv.count())

    def set_inv_state(self, invoice_id, state_name, state):
        inv_obj = self.get(invoice_id=invoice_id)
        if state_name == 'uploaded':
            inv_obj.is_loaded = state
        elif state_name == 'waiting':
            inv_obj.is_waiting = state
        elif state_name == 'processed':
            inv_obj.is_processed = state
        inv_obj.save()

    def update_stat_inv(self, invoice, 
        inet_pays, ph_pays, mgmn_pays, equip_pays, reinst_pays, other_pays, total_pays, pays_count):   
        invoice.internet_payments = inet_pays
        invoice.monthly_phone_payments = ph_pays
        invoice.mg_mn_payments = mgmn_pays
        invoice.equip_payments = equip_pays
        invoice.reinstall_payments = reinst_pays
        invoice.other_payments = other_pays
        invoice.total_payments = total_pays
        invoice.payments_count = pays_count
        
        invoice.save()

    def confirm_inv(self, invoice_id):
        pass

    def get_template_inv(self, bank):
        self.create(bank=bank)
        self.set_inv_state(
            invoice_id=self.get_all().last().id,
            state_name=self.get_inv_states().uploaded,
            state=True
        )
        return self.get_all().last()