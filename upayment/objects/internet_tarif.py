""" 
Базовый объект, представляющий тарифный план услуги Интернет, 
который пригодится при определении принадлежности платежа 
"""

from upayment.models import Internet_tarif

class TarifInternet:
    def create(self, name, price):
        tarif_instance = Internet_tarif(
            name=name,
            price=price
        )
        tarif_instance.save()
    
    def delete(self, tarif_id):
        self.get(tarif_id=tarif_id).delete()

    def get(self, tarif_id):
        return Internet_tarif.objects.get(id=tarif_id)

    def get_all(self):
        return Internet_tarif.objects.all()