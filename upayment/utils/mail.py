""" Email sender for password restoring """

from django.core.mail import send_mail
from datetime import datetime

class EmailSender():
    def send_mail_to_admin(self, mail_to=None, user_email=None, user_name=None):
        send_mail(
            'Запрос на восстановление доступа к UPayment',
            'Добрый день. Прошу восстановить мой доступ к системе UPayment, поскольку мною былы утрачены текущие '
            'реквизиты для аутентификации. Пользователь - {0}. E-mail - {1}. Дата - {2}'.format(
                user_name, user_email, datetime.now().strftime('%d-%m-%Y %H:%M')
            ),
            'nevergti@gmail.com',
            mail_to,
            fail_silently=False
        )