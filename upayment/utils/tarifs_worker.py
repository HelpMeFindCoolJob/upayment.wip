""" ОБъект, предоставляющий интерфейс для действий над Internet_tarif и Phone_tarif """

from upayment.objects.internet_tarif import TarifInternet
from upayment.objects.phone_tarif import TarifPhone

class TarifsWorker(TarifInternet, TarifPhone):
    def __init__(self, *args, **kwargs):
        self.inet_tarif_obj = TarifInternet()
        self.phone_tarif_obj = TarifPhone()

    def get_internet_tarif(self, tarif_id):
        return self.inet_tarif_obj.get(tarif_id=tarif_id)

    def get_phone_tarif(self, tarif_id):
        return self.phone_tarif_obj.get(tarif_id=tarif_id)

    def get_internet_prices(self):
        return self.inet_tarif_obj.get_all().values_list('price', flat=True)

    def get_phone_prices(self):
        return self.phone_tarif_obj.get_all().values_list('price', flat=True)