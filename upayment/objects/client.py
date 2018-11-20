""" Объект: представляющий абстрактного потребителя услуг (плательщика) и описывающий основные действия над ним """

class Client:
    def __init__(self, name, account_id, address, tariff_id):
        self.name = name
        self.account_id = account_id
        self.address = address
        self.tarif_id = tariff_id

    def __str__(self):
        return self.name

    def get_account(self):
        return self.account_id

    def get_address(self):
        return self.address

    def get_tarif_id(self):
        return self.tarif_id