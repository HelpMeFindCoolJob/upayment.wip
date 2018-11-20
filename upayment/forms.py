"""
Модуль с формами проекта
"""

from django import forms
from django.forms import widgets
from upayment.models import Payment, Connection_to_UTM_settings

class BankInvoiceForm(forms.Form):
    """
    Форма для загрузки файла с банковской выпиской
    """
    class Meta:
        file = forms.FileField()

class EditPaymentForm(forms.ModelForm):
    """
    Форма редактирования деталей платежа
    """
    def __init__(self, *args, **kwargs):
        forms.ModelForm.__init__(self, *args, **kwargs)
        # super(forms.ModelForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'
            self.fields[field].widget.attrs['placeholder'] = self.fields[field].help_text

    class Meta:
        model = Payment
        fields = ['client_full_name', 'account_id_internet', 'account_id_phone', 'client_address', 'bank_comment',
                'internet_payment', 'monthly_phone_payment', 'mg_mn_payment', 'equip_payment', 'reinstall_payment',
                'other_payment', 'unknown_payment']

class SettingsForm(forms.ModelForm):
    """
    Форма редкатирования настроек подключения к UTM
    """
    def __init__(self, *args, **kwargs):
        # super(forms.ModelForm, self).__init__(*args, **kwargs)
        forms.ModelForm.__init__(self, *args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'
            self.fields[field].widget.attrs['placeholder'] = self.fields[field].help_text
            if (field == 'password' or field == 'database_password'):
                self.fields[field].widget = widgets.PasswordInput()
                self.fields[field].widget.attrs['placeholder'] = '*******'
            elif (field == 'address' or field == 'database_host'):
                self.fields[field].widget.attrs['pattern'] = '^([0-9]{1,3}\.){3}[0-9]{1,3}$'

    class Meta:
        model = Connection_to_UTM_settings
        fields = ['address', 'user', 'password', 'transport_port', 'remote_port', 'database_user', 'database_password',
                'database_name', 'database_host', 'utm_util_path', 'comment']

class PasswordForm(forms.ModelForm):
    """
    Форма для сокрытия паролей
    """
    password = forms.CharField(widget=forms.PasswordInput)
    database_password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Connection_to_UTM_settings
        fields = '__all__'

# class EditSBRParserProfileForm(forms.ModelForm):
#     """
#     Форма для обработки профиелй Сбербанковского парсера
#     """
#     def __init__(self, *args, **kwargs):
#         forms.ModelForm.__init__(self, *args, **kwargs)

#     class Meta:
#         model = SBRParserProfile
#         fields = '__all__'
