# Generated by Django 2.0.2 on 2018-05-29 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('upayment', '0011_invoice_is_waiting'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoice',
            name='bank_id',
            field=models.IntegerField(default=0, help_text='Идентифицирует принадлежность выписки к банку (СБРб ВЗР).', verbose_name='Идентификатор банка'),
        ),
        migrations.AddField(
            model_name='invoice',
            name='equip_payments',
            field=models.DecimalField(decimal_places=2, default=0.0, help_text='Сумма платежей, за приобретенное оборудование.', max_digits=6, verbose_name='Платежи оборудования'),
        ),
        migrations.AddField(
            model_name='invoice',
            name='internet_payments',
            field=models.DecimalField(decimal_places=2, default=0.0, help_text='Сумма платежей за услуги Интернет.', max_digits=6, verbose_name='Абонентская плата Интернет'),
        ),
        migrations.AddField(
            model_name='invoice',
            name='mg_mn_payments',
            field=models.DecimalField(decimal_places=2, default=0.0, help_text='Сумма платежей за услуги Междугородней/Международной связи.', max_digits=6, verbose_name='Платежи за МГ/МН'),
        ),
        migrations.AddField(
            model_name='invoice',
            name='monthly_phone_payments',
            field=models.DecimalField(decimal_places=2, default=0.0, help_text='Сумма платежей за услуги Местной теелфонной связи.', max_digits=6, verbose_name='Аблннентская плата МТС'),
        ),
        migrations.AddField(
            model_name='invoice',
            name='other_payments',
            field=models.DecimalField(decimal_places=2, default=0.0, help_text='Сумма платежей, не подходящих под остальные категории.', max_digits=6, verbose_name='Остальные платежи'),
        ),
        migrations.AddField(
            model_name='invoice',
            name='payments_count',
            field=models.IntegerField(default=0, help_text='Общее количество платежей по выкиске.', verbose_name='Количество платежей'),
        ),
        migrations.AddField(
            model_name='invoice',
            name='reinstall_payments',
            field=models.DecimalField(decimal_places=2, default=0.0, help_text='Сумма платежей, за услуги переустановки телефона.', max_digits=6, verbose_name='Платежи переустановка'),
        ),
        migrations.AddField(
            model_name='invoice',
            name='total_payments',
            field=models.DecimalField(decimal_places=2, default=0.0, help_text='Общая сумма всех платежей по выписке.', max_digits=6, verbose_name='Итого'),
        ),
    ]