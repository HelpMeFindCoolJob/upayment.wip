from django.db import models
from datetime import datetime
from decimal import Decimal

class Payment(models.Model):
    creation_date = models.DateField(
        auto_now_add=True,
        verbose_name='Дата загрузки платежа',
        help_text='Дата загрузки платежа в систему. Только для чтнеия.',
        editable=False
    )
    last_change_date = models.DateField(
        auto_now=True,
        verbose_name='Дата изменения атрибудтов платежа',
        help_text='Дата последнего измнения атрибутов платежа.'
    )
    payment_date = models.DateTimeField(
        verbose_name='Дата совершения платежа',
        help_text='Дата совершения платежа.'
    )
    client_full_name = models.CharField(
        max_length=250,
        verbose_name='ФИО плательщика',
        help_text='Полное имя плательщика.'
    )
    account_id_internet = models.CharField(
        default='Не определен',
        max_length=4,
        verbose_name='Номер счета Интернет',
        help_text='Номер счета клиента (ID счета) за услуги Интернет в UTM5.',
    )
    account_id_phone = models.CharField(
        default='Не определен',
        max_length=4,
        verbose_name='Номер счета Телефония',
        help_text='Номер счета клиента (ID счета) за услуги Телефонии в UTM5.',
    )
    client_address = models.CharField(
        max_length=300,
        verbose_name='Адрес плательщика',
        help_text='Полный адрес плательщика.'
    )
    bank_comment = models.CharField(
        default='-',
        max_length=100,
        verbose_name='Комментарий банка',
        help_text='Банковский комментарий к платежу, взятый из выписки.'
    )
    internet_payment = models.DecimalField(
        default=Decimal(0.00),
        max_digits=6,
        decimal_places=2,
        verbose_name='Абонентская плата Интернет',
        help_text='Сумма платежа за услуги Интернет.'
    )
    monthly_phone_payment = models.DecimalField(
        default=Decimal(0.00),
        max_digits=6,
        decimal_places=2,
        verbose_name='Аблннентская плата МТС',
        help_text='Сумма платежа за услуги Местной теелфонной связи.'
    )
    mg_mn_payment = models.DecimalField(
        default=Decimal(0.00),
        max_digits=6,
        decimal_places=2,
        verbose_name='Платеж за МГ/МН',
        help_text='Сумма платежа за услуги Междугородней/Международной связи.'
    )
    equip_payment = models.DecimalField(
        default=Decimal(0.00),
        max_digits=6,
        decimal_places=2,
        verbose_name='Платеж за оборудование',
        help_text='Сумма платежа, за приобретенное оборудование.'
    )
    reinstall_payment = models.DecimalField(
        default=Decimal(0.00),
        max_digits=6,
        decimal_places=2,
        verbose_name='Платеж переустановка',
        help_text='Сумма платежа, за услуги переустановки телефона.'
    )
    other_payment = models.DecimalField(
        default=Decimal(0.00),
        max_digits=6,
        decimal_places=2,
        verbose_name='Остальные платежи',
        help_text='Сумма платежа, за услуги, не подходящих под остальные категории.'
    )
    unknown_payment = models.DecimalField(
        default=Decimal(0.00),
        max_digits=6,
        decimal_places=2,
        verbose_name='Неизвестный платеж',
        help_text='Сумма платежа, который невозможно идентифицировать по категориям.'
    )
    total = models.DecimalField(
        default=Decimal(0.00),
        max_digits=6,
        decimal_places=2,
        verbose_name='Итого',
        help_text='Общая сумма платежей по всем услугам.'
    )
    is_complited = models.BooleanField(
        verbose_name='Платеж обработан',
        help_text='Позволяет понять был ли отправлен (проведен) платеж на сервер.'
    )
    in_invoice = models.ForeignKey(
        'Invoice',
        on_delete=models.CASCADE,
        verbose_name='Выписка',
        help_text='Выписка6 в которой фигурировал данный платеж.'
    )

    def __str__(self):
        return 'Платеж {0} от {1}'.format(self.client_full_name, self.payment_date)

    def save(self):
        self.last_change_date = datetime.now().strftime('%d-%m-%Y %H:%M')
        self.total = self.internet_payment + self.monthly_phone_payment + self.mg_mn_payment + \
                     self.unknown_payment + self.equip_payment + self.other_payment + self.reinstall_payment
        super(Payment, self).save()

    class meta:
        verbose_name = 'Платеж',
        verbose_name_plural = 'Платежи'


class Invoice(models.Model):
    creation_date = models.DateField(
        auto_now_add=True,
        verbose_name='Дата загрузки выписки',
        help_text='Дата загрузки банковской выписки в систему. Только для чтнеия.',
        editable=False
    )
    # number_invoice = models.IntegerField(
    #     verbose_name='Номер выписки',
    #     help_text='Порядковый номер выписки.'
    # )
    name_invoice = models.CharField(
        blank=True,
        default='Без имени',
        max_length=100,
        verbose_name='Наименование выписки',
        help_text='Наименование выписки. Поле не требует редактирования и вычисляется автоматически в представлении.'
    )
    is_loaded = models.BooleanField(
        default=False,
        verbose_name='Выписка загружена на сервер',
        help_text='Позволяет определить, что выписка была загружена на сервер. И готова к редактированию.'
    )
    is_waiting = models.BooleanField(
        default=False,
        verbose_name='Выписка ожидает отправки на сервер',
        help_text='Позволяет определить, что выписка обработана оператором. И готова к обработке.'
    )
    is_processed = models.BooleanField(
        default=False,
        verbose_name = 'Выписка обработана и проведена',
        help_text = 'Позволяет понять проведены ли платежи по выписке. И была ли подтверждена обработка.'
    )
    bank_id = models.CharField(
        default='Неизвестен',
        max_length=10,
        verbose_name='Идентификатор банка',
        help_text='Идентифицирует принадлежность выписки к банку (СБР, ВЗР).'
    )
    internet_payments = models.DecimalField(
        default=0.0,
        max_digits=12,
        decimal_places=2,
        verbose_name='Абонентская плата Интернет',
        help_text='Сумма платежей за услуги Интернет.'
    )
    monthly_phone_payments = models.DecimalField(
        default=0.0,
        max_digits=12,
        decimal_places=2,
        verbose_name='Аблннентская плата МТС',
        help_text='Сумма платежей за услуги Местной теелфонной связи.'
    )
    mg_mn_payments = models.DecimalField(
        default=0.0,
        max_digits=12,
        decimal_places=2,
        verbose_name='Платежи за МГ/МН',
        help_text='Сумма платежей за услуги Междугородней/Международной связи.'
    )
    equip_payments = models.DecimalField(
        default=0.0,
        max_digits=12,
        decimal_places=2,
        verbose_name='Платежи оборудования',
        help_text='Сумма платежей, за приобретенное оборудование.'
    )
    reinstall_payments = models.DecimalField(
        default=0.0,
        max_digits=12,
        decimal_places=2,
        verbose_name='Платежи переустановка',
        help_text='Сумма платежей, за услуги переустановки телефона.'
    )
    other_payments = models.DecimalField(
        default=0.0,
        max_digits=12,
        decimal_places=2,
        verbose_name='Остальные платежи',
        help_text='Сумма платежей, не подходящих под остальные категории.'
    )
    total_payments = models.DecimalField(
        default=0.0,
        max_digits=12,
        decimal_places=2,
        verbose_name='Итого',
        help_text='Общая сумма всех платежей по выписке.'
    )
    payments_count = models.IntegerField(
        default=0,
        verbose_name='Количество платежей',
        help_text='Общее количество платежей по выкиске.'
    )


    def __str__(self):
        return 'Выписка #{0} от {1}'.format(self.id, self.creation_date)

    class meta:
        verbose_name = 'Банковская выписка',
        verbose_name_plural = 'Банковские выписки'

class Report(models.Model):
    creation_date = models.DateField(
        null=True,
        blank=True,
        auto_now_add=True,
        verbose_name='Дата формирования отчета',
        help_text='Дата формирования отчета. Только для чтения',
        editable=False
    )
    number_report = models.IntegerField(
        default=0,
        verbose_name='Номер отчета',
        help_text='Порядковый номер отчета.'
    )
    name_report = models.CharField(
        blank=True,
        default='Без имени',
        max_length=100,
        verbose_name='Наименование отчета',
        help_text='Наименование отчета и его файла. Поле не требует редактирования и вычисляется автоматически в представлении.'
    )
    operator = models.CharField(
        default='Администратор',
        max_length=100,
        verbose_name='Оператор',
        help_text='Оператор, сформировавшиий отчет.'
    )
    in_invoice = models.ForeignKey(
        'Invoice',
        null=True,
        on_delete=models.CASCADE,
        verbose_name='Выписка',
        help_text='Выписка, по которой сформирован отчет.'
    )
    file = models.FileField(
        default=None,
        blank=True,
        upload_to='reports/',
        verbose_name='Файл отчета',
        help_text='Файл отчета, доступный для скачивания и экспорта.'
    )
    internet_sum = models.DecimalField(
        default=0.0,
        max_digits=6,
        decimal_places=2,
        verbose_name='Абонентская плата Интернет',
        help_text='Сумма платежей по выписке за услуги Интернет.'
    )
    monthly_phone_sum = models.DecimalField(
        default=0.0,
        max_digits=6,
        decimal_places=2,
        verbose_name='Аблннентская плата МТС',
        help_text='Сумма платежей по выписке за услуги Местной теелфонной связи.'
    )
    mg_mn_sum = models.DecimalField(
        default=0.0,
        max_digits=6,
        decimal_places=2,
        verbose_name='Платежи за МГ/МН',
        help_text='Сумма платежей по выписке за услуги Междугородней/Международной связи.'
    )
    equip_sum = models.DecimalField(
        default=0.0,
        max_digits=6,
        decimal_places=2,
        verbose_name='Приобретение оборудования',
        help_text='Сумма платежей по выписке за приобретение оборудования.'
    )
    phone_install_sum = models.DecimalField(
        default=0.0,
        max_digits=6,
        decimal_places=2,
        verbose_name='Установка телефона',
        help_text='Сумма платежей по выписке за услугу установки телефоноа.'
    )
    phone_reinstall_sum = models.DecimalField(
        default=0.0,
        max_digits=6,
        decimal_places=2,
        verbose_name='Переустановка телефона',
        help_text='Сумма платежей по выписке за услугу переустановки телефоноа.'
    )
    total = models.DecimalField(
        default=0.0,
        max_digits=6,
        decimal_places=2,
        verbose_name='Итого',
        help_text='Общая сумма платежей по выписке.'
    )

    def __str__(self):
        return self.name_report

    def save(self):
        self.total = self.internet_sum + self.monthly_phone_sum + self.mg_mn_sum + self.equip_sum + \
                    self.phone_install_sum + self.phone_reinstall_sum
        super(Report, self).save()

    class meta:
        verbose_name = 'Отчет',
        verbose_name_plural = 'Отчеты'

class Internet_tarif(models.Model):
    name = models.CharField(
        default='Без имени',
        max_length=100,
        verbose_name='Название',
        help_text='Полное название тарифа.'
    )
    price = models.DecimalField(
        default=0.0,
        max_digits=6,
        decimal_places=2,
        verbose_name='Стоимость',
        help_text='Стоимость услуги по тарифу.'
    )

    def __str__(self):
        return self.name

    class meta:
        verbose_name = 'Тариф Интернет',
        verbose_name_plural = 'Тарифы доступа к услуге Интернет'


class Phone_tarif(models.Model):
    name = models.CharField(
        default='Без имени',
        max_length=100,
        verbose_name='Название',
        help_text='Полное название тарифа.'
    )
    price = models.DecimalField(
        default=0.0,
        max_digits=6,
        decimal_places=2,
        verbose_name='Стоимость',
        help_text='Стоимость услуги по тарифу.'
    )

    def __str__(self):
        return self.name

    class meta:
        verbose_name = 'Тариф Местная телефонная связь',
        verbose_name_plural = 'Тарифы доступа к услуге Местная Телефонная Связь'

class Connection_to_UTM_settings(models.Model):
    address = models.GenericIPAddressField(
        default='172.0.0.1',
        verbose_name='IP сервера',
        help_text='IP адрес сервера.'
    )
    user = models.CharField(
        default='Admin',
        max_length=50,
        verbose_name='Пользователь',
        help_text='Имя пользователя.'
    )
    password = models.CharField(
        default='',
        max_length=50,
        verbose_name='Пароль',
        help_text='Пароль. Не более 50 символов.'
    )
    transport_port = models.PositiveSmallIntegerField(
        default=22,
        verbose_name='Номер порта для подключения',
        help_text='Порт для подключения для установления соединения с сервером.'
    )
    remote_port = models.PositiveSmallIntegerField(
        default=3306,
        verbose_name='Порт для БД',
        help_text='порт: который необходимо пробросить через тоннель.'
    )
    database_user = models.CharField(
        default='Admin',
        max_length=50,
        verbose_name='Пользователь БД',
        help_text='Имя пользователя для подключения к БД.'
    )
    database_password = models.CharField(
        default='',
        max_length=50,
        verbose_name='Пароль БД',
        help_text='Пароль для подключения к БД. Не более 50 символов.'
    )
    database_name = models.CharField(
        default='UTM5',
        max_length=50,
        verbose_name='Имя БД',
        help_text='Наименование БД.'
    )
    database_host = models.GenericIPAddressField(
        default='172.0.0.1',
        verbose_name='IP хоста с БД',
        help_text='IP адрес хоста с БД.'
    )
    utm_util_path = models.CharField(
        default='',
        max_length=100,
        verbose_name='Путь к UTM5 payment утилите',
        help_text='Полный путь к UTM5 утилите для запуска автоплатежей.'
    )
    comment = models.CharField(
        default='Отсутствует',
        max_length=100,
        verbose_name='Комментарий',
        help_text='Подбробный комментарий'
    )

    def __str__(self):
        return 'Настройки подключения к серверу и БД ("{0}")'.format(self.comment)

class LogPayment(models.Model):
    date = models.DateField(
        null=True,
        blank=True,
        auto_now_add=True,
        verbose_name='Дата совершения платежа',
        help_text='Дата совершения платежа.',
        editable=False
    )
    client_full_name = models.CharField(
        max_length=250,
        verbose_name='ФИО плательщика',
        help_text='Полное имя плательщика.'
    )
    client_address = models.CharField(
        default='',
        max_length=300,
        verbose_name='Адрес плательщика',
        help_text='Полный адрес плательщика.'
    )
    account_id = models.CharField(
        default='НЗВ',
        max_length=4,
        verbose_name='Номер счета',
        help_text='Номер счета клиента (ID счета) в UTM5.',
    )
    bank_comment = models.CharField(
        default='-',
        max_length=100,
        verbose_name='Комментарий банка',
        help_text='Банковский комментарий к платежу, взятый из выписки.'
    )
    summ = models.DecimalField(
        default=Decimal(0.00),
        max_digits=6,
        decimal_places=2,
        verbose_name='Сумма платежа',
        help_text='Сумма платежа за услуги связи.'
    )
    pyament_type = models.CharField(
        default='НЗВ',
        max_length=10,
        verbose_name='Тип платежа',
        help_text='Тип платежа. Должен сопоставляться с лицевым счетом клиента.'
    )
    payment_comment = models.CharField(
        default='нзв',
        max_length=10,
        verbose_name='Комментарий к платежу',
        help_text='Комментарий, необходимый для идентификации типа платежа в UTM5.'
    )
    payment_status = models.CharField(
        default='ИГН',
        max_length=10,
        verbose_name='Статус платежа',
        help_text='Статус платежа. Служит для установления успешности выполнения опреации в UTM5.'
    )
    in_invoice = models.ForeignKey(
        'Invoice',
        default=None,
        on_delete=models.CASCADE,
        verbose_name='Выписка',
        help_text='Выписка, в которой фигурировал данный платеж.'
    )

    def __str__(self):
        return 'Платеж от {0} {1}'.format(self.client_full_name, self.date)

    class meta:
        app_label = 'logs'
        verbose_name = 'Статус платежа',
        verbose_name_plural = 'Статус платежей'

class SBRParserProfile(models.Model):
    profile_name = models.CharField(
        default='Профиль 0',
        max_length=30,
        verbose_name='Название профиля',
        help_text='Название для данного профиля'
    )
    delimeter = models.CharField(
        default=';',
        max_length=1,
        verbose_name='Разделитель',
        help_text='Разделитель полей в файле банковской выписки'
    )
    example = models.CharField(
        default='01-08-2018;09-55-48;9040;9900000V;300445142394;ФИО;МО, г. Рошаль, ул. Косякова 13;Интернет;980,00;970,20;9,80;',
        max_length=300,
        verbose_name='Пример',
        help_text='Пример строки, который показывает как может выглядеть формат банковской выписки'
    )
    date_position = models.PositiveIntegerField(
        default=0,
        verbose_name='Позиция с описанием даты платежа',
        help_text='Указание позиции, на которой следует искать дату платежа'
    )
    time_position = models.PositiveIntegerField(
        default=1,
        verbose_name='Позиция с описанием времени платежа',
        help_text='Указание позиции, на которой следует искать время платежа'
    )
    name_position = models.PositiveIntegerField(
        default=2,
        verbose_name='Позиция с описанием имени оплатишего клиента',
        help_text='Указание позиции, на которой следует ФИО влиента'
    )
    address_position = models.PositiveIntegerField(
        default=3,
        verbose_name='Позиция с описанием адреса клиента',
        help_text='Указание позиции, на которой следует адрес клиента'
    )
    comment_position = models.PositiveIntegerField(
        default=4,
        verbose_name='Позиция с описанием комментария к платежу',
        help_text='Указание позиции, на которой следует искать комментарий оператора банка'
    )
    summ_position = models.PositiveIntegerField(
        default=5,
        verbose_name='Позиция с описанием суммы платежа',
        help_text='Указание позиции, на которой следует искать сумму платежа'
    )

    def __str__(self):
            return self.profile_name

    class meta:
        verbose_name = 'Профиль СБР парсера',
        verbose_name_plural = 'Прифили СБР парсера'