""" Базовый объект, представляющий тарифный план услуг Телефонии, который пригодится при определении принадлежности платежа """

from upayment.models import Phone_tarif

class TarifPhone:
    def create(self, name, price):
        tarif_instance = Phone_tarif(
            name=name,
            price=price
        )
        tarif_instance.save()
    
    def delete(self, tarif_id):
        self.get(tarif_id=tarif_id).delete()

    def get(self, tarif_id):
        return Phone_tarif.objects.get(id=tarif_id)

    def get_all(self):
        return Phone_tarif.objects.all()  