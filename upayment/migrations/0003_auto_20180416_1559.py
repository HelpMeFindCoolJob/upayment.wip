# Generated by Django 2.0.2 on 2018-04-16 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('upayment', '0002_invoice_name_invoice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='name_invoice',
            field=models.CharField(help_text='Наименование выписки. Поле не требует редактирования и вычисляется автоматически.', max_length=100, verbose_name='Наименование выписки'),
        ),
    ]
