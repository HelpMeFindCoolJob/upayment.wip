from .utm_connect import ServerConnect
from .log import Log
import paramiko
from decimal import Decimal

class UtmPayment(ServerConnect, Log):
    def do_pay(self, all_payments): # !!! Добавить фатктическую дату платежа !!!
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(self.config.address, username=self.config.user, password=self.config.password, timeout=600)

        for payment in all_payments:
            commands = []
            payment_options = []

            channel = ssh.get_transport().open_session()
            channel.settimeout(10800)

            if payment.account_id_internet.isdigit():
                if not payment.internet_payment == Decimal(0):
                    commands.append('{0} -b {1} -a {2} -L "ИНТ"'.format(
                        self.config.utm_util_path, payment.internet_payment, payment.account_id_internet
                    ))
                    payment_options.append((
                        payment.account_id_internet,
                        payment.internet_payment,
                        'ИНТ',
                        'ИНТ'
                    ))
                if not payment.other_payment == Decimal(0): # Прочие платежи - типа вызов специалиста или иные доп услуги
                    commands.append('{0} -b {1} -a {2} -L "ИНОЕ"'.format(
                        self.config.utm_util_path, payment.other_payment, payment.account_id_internet
                    ))
                    payment_options.append((
                        payment.account_id_internet,
                        payment.other_payment,
                        'ИНОЕ',
                        'ИНОЕ'
                    ))
            if payment.account_id_phone.isdigit():
                if not payment.monthly_phone_payment == Decimal(0):
                    commands.append('{0} -b {1} -a {2} -L "АБТ"'.format(
                        self.config.utm_util_path, payment.monthly_phone_payment, payment.account_id_phone
                    ))
                    payment_options.append((
                        payment.account_id_phone,
                        payment.monthly_phone_payment,
                        'АБМТ',
                        'АБТ'
                    ))
                if not payment.mg_mn_payment == Decimal(0):
                    commands.append('{0} -b {1} -a {2} -L "МГМН"'.format(
                        self.config.utm_util_path, payment.mg_mn_payment, payment.account_id_phone
                    ))
                    payment_options.append((
                        payment.account_id_phone,
                        payment.mg_mn_payment,
                        'МГМН',
                        'МГМН'
                    ))
            if len(commands) == 1:
                channel.exec_command('{0}'.format(commands[0]))
            elif len(commands) == 2:
                channel.exec_command('{0} \n {1}'.format(commands[0], commands[1]))
            elif len(commands) == 3:
                channel.exec_command('{0} \n {1} \n {2}'.format(
                    commands[0], commands[1], commands[2]
                ))

            Log.write_payment_info_in_log(self, payment=payment, options=payment_options, status=channel.recv_exit_status())
            channel.close()
        ssh.close()