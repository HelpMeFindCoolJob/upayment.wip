# Generated by Django 2.0.2 on 2018-05-31 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('upayment', '0018_auto_20180531_1008'),
    ]

    operations = [
        migrations.CreateModel(
            name='Internet_tarif',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Без имени', help_text='Полное название тарифа.', max_length=100, verbose_name='Название')),
                ('price', models.DecimalField(decimal_places=2, default=0.0, help_text='Стоимость услуги по тарифу.', max_digits=6, verbose_name='Стоимость')),
            ],
        ),
        migrations.CreateModel(
            name='MTS_tarif',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Без имени', help_text='Полное название тарифа.', max_length=100, verbose_name='Название')),
                ('price', models.DecimalField(decimal_places=2, default=0.0, help_text='Стоимость услуги по тарифу.', max_digits=6, verbose_name='Стоимость')),
            ],
        ),
    ]
