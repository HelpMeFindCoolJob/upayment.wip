""" Модуль, управляющий SSH соединением к хосту с сервером UTM """

from sshtunnel import SSHTunnelForwarder
from upayment.models import Connection_to_UTM_settings

class ServerConnect():
    def __init__(self):        
        self.config = Connection_to_UTM_settings.objects.latest('id')
        # self.address = self.config.address
        self.address = '172.16.1.16'
        self.username = self.config.user
        self.password = self.config.password
        self.transport_port = self.config.transport_port
        self.remote_port = self.config.remote_port
        self.database_host = self.config.database_host
        self.status_code = 'NO'
        self.tunnel = None
        self.payment_util = self.config.utm_util_path

    def connect(self):
        """
        Устанавливает SSH соединение с хостом с UTM5, пробрасывает порты, устанавливает
        соотвествующий атрибут-статус.
        """
        try:
            if self.status_code == 'NO' or self.status_code == 'ERROR':
                self.tunnel = SSHTunnelForwarder(
                    (self.address, int(self.transport_port)),
                    ssh_password=self.password,
                    ssh_username=self.username,
                    local_bind_address=(self.database_host, int(self.remote_port)),
                    remote_bind_address=(self.database_host, int(self.remote_port))
                )
                self.tunnel.start()
        except AssertionError as exc:
            self.status_code = 'ERROR'
            print('ERROR <module-utm_connect, method-connect>: Невозможно установить соединение с {0}. Причина  - {1}'.format(self.address, exc))
        except Exception as exc:
            self.status_code = 'ERROR'
            print('ERROR <module-utm_connect, method-connect>: Невозможно установить соединение с {0}. Причина  - {1}'.format(self.address, exc))
        else:
            self.status_code = 'YES'

    def disconnect(self):
        """
        Разрывает SSH соединение с хостом с UTM5. Устанавливает соответсвующий атрибут-статус.
        """
        if self.status_code == 'YES':
                self.tunnel.stop()
                self.status_code = 'NO'

    def get_status(self):
        """
        Возвращает текущий статус SSH подключения.
        """
        return self.status_code