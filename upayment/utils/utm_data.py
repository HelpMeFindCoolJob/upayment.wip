""" Модуль обработчика данных из UTM5 """

from upayment.utils.utm_connect import ServerConnect
from upayment.objects.client import Client

import mysql.connector
import datetime
import calendar
from sys import stdout as cmd_output

class Data(ServerConnect):
    def __init__(self):
        ServerConnect.__init__(self)
        self.queries = {
            'clients_list':
                'SELECT users_accounts.account_id, users.login, users.full_name, users.actual_address, '
                'users.flat_number, users.comments, account_tariff_link.tariff_id '
                'FROM users, users_accounts, account_tariff_link '
                'WHERE users.id = users_accounts.uid '
                'AND users_accounts.account_id = account_tariff_link.account_id '
                'AND users.is_deleted = 0 '
                'AND account_tariff_link.is_deleted = 0;'
        }
        self.db_status = 'DISCONNECT'
        self.db_name = self.config.database_name
        self.db_host = self.config.database_host
        self.db_user = self.config.database_user
        self.db_password = self.config.database_password
        self.mysql_connect = None

    def connect_to_db(self):
        """
        Обеспечивает подключение к MySQL БД, используя метод connect
        объекта ServerConnect. Устанавливает соответсвующий атрибут-статус.
        """
        try:
            if self.status_code == 'NO' or self.status_code == 'ERROR':
                self.connect()
                print('CONNECTED')
        except Exception:
            print('ERROR <module-utm_data, method-connect_to_db>: Невозможно устанвоить SSH соединение.')
            self.db_status = 'ERROR'

        try:
            if self.db_status == 'DISCONNECT':
                self.mysql_connect = mysql.connector.connect(
                    user=self.db_user, password=self.db_password, host='localhost', database=self.db_name)
        except mysql.connector.Error as exc:
            print('ERROR <module-utm_data, method-connect_to_db>: Невозможно устанвоить соединение с сервером БД. Причина - {}.'.format(exc))
            self.db_status = 'ERROR'
        else:
            self.db_status = 'CONNECT'

    def disconnect_from_db(self):
        """
        Разрывает установленное соединение с БД. Устанавливает соответсвующий абтрибут-статус.
        """
        if self.status_code == 'YES':
            self.disconnect()
        try:
            if self.db_status == 'CONNECT':
                self.mysql_connect.close()
        except mysql.connector.Error as exc:
            self.db_status = 'ERROR'
        else:
            self.db_status = 'DISCONNECT'

    def get_clients_list(self):  # Получить список всех клиентов (физические и юридические лица)
        if self.db_status == 'DISCONNECT':
            self.connect_to_db()
        try:
            output = []
            clients = []
            client_query = self.queries['clients_list']  # Селект на получение всех клиентов
            if not self.mysql_connect:
                raise mysql.connector.Error
            cursor = self.mysql_connect.cursor()
            cursor.execute(client_query)
            for (account_id, login, full_name, actual_address, flat_number, comments, tariff_id) in cursor:
                client = Client(
                    account_id=account_id,
                    name=full_name,
                    tariff_id=tariff_id,
                    address='{0} {1} {2}'.format(actual_address, flat_number, comments)
                )
                clients.append(client)

                output.append('%s|%s|%s|%s|%s|%s|%s' % \
                              (account_id, login, full_name, actual_address, flat_number, comments, tariff_id))
                # print('%s|%s|%s|%s|%s|%s|%s' % \
                #               (account_id, login, full_name, actual_address, flat_number, comments, tariff_id))

        except mysql.connector.Error as exc:
            print('ERROR: Ошибка MySQL %s. Дальнейшая работа невозможна. '
                  'Проверьте журнал для получения информации.' % exc.errno)
            return []
        else:
            self.disconnect_from_db()
            return output