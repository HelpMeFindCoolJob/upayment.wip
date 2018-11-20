from django.contrib import admin
from .forms import PasswordForm
from .models import Payment, Invoice, Report, Internet_tarif, Phone_tarif, Connection_to_UTM_settings, LogPayment, SBRParserProfile

models = [
    Payment,
    Invoice,
    Report,
    Internet_tarif,
    Phone_tarif
]

logs = [
    LogPayment
]

admin.site.site_header = "Панель администрирования UPayment"

class UTMPasswordAdmin(admin.ModelAdmin):
    form = PasswordForm

admin.site.register(models)
admin.site.register(logs)
admin.site.register(Connection_to_UTM_settings, UTMPasswordAdmin)
admin.site.register(SBRParserProfile)