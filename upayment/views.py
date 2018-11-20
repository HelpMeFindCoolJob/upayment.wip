import datetime

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse
from upayment.templatetags.extra_tags import in_group
from .models import Invoice, Payment, Report, Connection_to_UTM_settings, SBRParserProfile
from .forms import BankInvoiceForm, EditPaymentForm, SettingsForm
from .utils.report import ReportGenerator
from .utils.utm_payment import UtmPayment
from .utils.invoice_worker import InvoiceWorker
from .utils.payment_worker import PaymentWorker
from .utils.tarifs_worker import TarifsWorker
from .utils.parser import Parser
from .utils.mail import EmailSender
from .utils.log import Log

author = 'Kineev Alexey'
invoice_worker = InvoiceWorker()
payment_worker = PaymentWorker()
tarif_worker = TarifsWorker()
parser = Parser()
year = datetime.datetime.now().year


@csrf_exempt
def login_user(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return redirect('/home/')
        else:
            return redirect('/sign_in/')
    else:
        error = 'Неверные имя пользователя и/или пароль.'
        return render(request, 'login.html',
            {
                'author': author,
                'error' : error
            }
        )

@csrf_exempt
def send_admin_mail(request):
    info = 'Запрос на восстановление доступа к системе UPayment был успешно отправлен.'
    superusers_emails = User.objects.filter(is_superuser=True).values_list('email', flat=True)
    email = request.POST.get('email')
    name = request.POST.get('name')
    email_worker = EmailSender()
    email_worker.send_mail_to_admin(mail_to=superusers_emails, user_email=email, user_name=name)

    return render(request, 'login.html',
        {
            'author': author,
            'info': info
        }
    )

def logout_user(request):
    logout(request)
    return redirect('/sign_in/')

def sign_in(request):
    return render(request, 'login.html',
        {
            'author': author
        }
    )

@login_required
def home(request):
    reports = Report.objects.all()[:10]
    user = request.user
    sbr_profiles = SBRParserProfile.objects.all()

    all_info = invoice_worker.get_inv_info()
    all_info.update({'reports': reports, 'user':user, 'sbr_profiles':sbr_profiles})

    return render(request, 'n_home.html', all_info)

@csrf_exempt
@login_required
def utm_settings(request):
    """
    Представление для отображения настроек для подключения к серверу UTM5
    """    
    user = request.user
    if not in_group(user=user, group='Администраторы'):
        return redirect('/home')
    else:
        reports = Report.objects.all()[:10]
        user = request.user
        settings = Connection_to_UTM_settings.objects.last()
        all_info = invoice_worker.get_inv_info()

        if request.method == 'POST':

            form = SettingsForm(request.POST, instance=settings)
            if form.is_valid():
                p_instance = form.save()
                p_instance.is_complited = False
                p_instance.save()
                return redirect('/home')
        else:
            form = SettingsForm(instance=settings)

        all_info.update({'reports': reports, 'user': user, 'settings': settings, 'form': form})

        return render(request, 'utm_settings.html', all_info)

@csrf_exempt
@login_required
def create_sbr_parser_profile(request):
    """
    Создает профиль для Сбербанковского парсера. Переадресовывает на sbr_profiles.html
    """
    user = request.user
    if not in_group(user=user, group='Администраторы'):
        return redirect('/home')
    else:        
        if request.method == 'POST':
            new_profile = SBRParserProfile(
                profile_name=request.POST.get('profile_name'),
                delimeter=request.POST.get('delimeter'),
                example=request.POST.get('example'),
                date_position=request.POST.get('date_position'),
                time_position=request.POST.get('time_position'),
                name_position=request.POST.get('name_position'),
                address_position=request.POST.get('address_position'),
                comment_position=request.POST.get('comment_position'),
                summ_position=request.POST.get('summ_position')
            )
            new_profile.save()
        return redirect('/sbr_profiles')    

@csrf_exempt
@login_required
def edit_sbr_parser_profile(request, profile_id):
    """
    Редактирует профиль для Сбербанковского парсера. Переадресовывает на sbr_prfofiles.html
    """
    user = request.user
    if not in_group(user=user, group='Администраторы'):
        return redirect('/home')
    else:
        if request.method == 'POST':
            profile = SBRParserProfile.objects.get(id=profile_id)
            profile.profile_name = request.POST.get('profile_name')
            profile.delimeter = request.POST.get('delimeter')
            profile.example = request.POST.get('example')
            profile.date_position = request.POST.get('date_position')
            profile.time_position = request.POST.get('time_position')
            profile.name_position = request.POST.get('name_position')
            profile.address_position = request.POST.get('address_position')
            profile.comment_position = request.POST.get('comment_position')
            profile.summ_position = request.POST.get('summ_position')
            profile.save()
        return redirect('/sbr_profiles')

@csrf_exempt
@login_required
def delete_sbr_parser_profile(request, profile_id):
    """
    Удаляет профиль для Сбербанковского парсера. Перенаправляет на sbr_profiles.html
    """
    user = request.user
    if not in_group(user=user, group='Администраторы'):
        return redirect('/home')
    else:
        profile = SBRParserProfile.objects.get(id=profile_id)
        profile.delete()
    return redirect('/sbr_profiles')

@csrf_exempt
@login_required
def sbr_profiles(request):
    """
    Представление для отображения настроек профилей Сбербанковского парсера
    """    
    user = request.user
    if not in_group(user=user, group='Администраторы'):
        return redirect('/home')
    else:
        reports = Report.objects.all()[:10]
        user = request.user
        profiles = SBRParserProfile.objects.all()
        all_info = invoice_worker.get_inv_info()
        all_info.update({'reports': reports, 'user': user, 'profiles': profiles})

        return render(request, 'sbr_profiles.html', all_info)


@login_required
@csrf_exempt
def upload_invoice(request, profile_type, profile_id):
    if request.method == 'POST':
        form = BankInvoiceForm(request.POST, request.FILES)
        for file in request.FILES.getlist('file'):
            # parser.parse_bank_file(file, invoice_handler=invoice_worker)
            
            parser.work_on_file(file, invoice_worker, payment_worker, tarif_worker, profile_type, profile_id)

        if form.is_valid():
            return HttpResponseRedirect('/home')
    else:
        form = BankInvoiceForm()

    return render(request, 'home.html',
        {
            'form': form
        }
    )

@login_required
def payments_in_invoice(request, invoice_id):
    payments = Payment.objects.filter(in_invoice=invoice_id)
    current_invoice = invoice_worker.get(invoice_id=invoice_id)
    reports = Report.objects.all()[:10]
    user = request.user
    all_info = invoice_worker.get_inv_info()
    all_info.update({'reports': reports, 'user': user, 'payments': payments, 'current_invoice': current_invoice})

    return render(request, 'n_payments.html', all_info)

@login_required
def waiting_invoices(request):
    reports = Report.objects.all()[:10]
    user = request.user
    all_info = invoice_worker.get_inv_info()
    all_info.update({'reports': reports, 'user': user})

    return render(request, 'n_invoices.html', all_info)

@login_required
def processed_invoices(request, invoice_id):
    logger = Log()
    log_payments = logger.get_payment_info_from_log(invoice=invoice_id)
    current_invoice = invoice_worker.get(invoice_id=invoice_id)
    reports = Report.objects.all()[:10]
    user = request.user
    all_info = invoice_worker.get_inv_info()
    all_info.update({'reports': reports, 'user': user, 'log_payments': log_payments, 'current_invoice': current_invoice})

    return render(request, 'pr_payments.html', all_info)

@login_required
def reports(request):
    reports = Report.objects.all()[:10]
    user = request.user
    all_info = invoice_worker.get_inv_info()
    all_info.update(
        {'reports': reports, 'user': user})

    return render(request, 'reports.html', all_info)

@login_required
def delete_upload_invoice(request, invoice_id):
    # invoice = invoice_worker.get(invoice_id=invoice_id)
    invoice_worker.delete(invoice_id=invoice_id)

    return HttpResponseRedirect('/home')

@login_required
def confirm_correctness_invoice(request, invoice_id):
    invoice = Invoice.objects.get(id=invoice_id)
    payments = Payment.objects.filter(in_invoice=invoice_id)
    invoice.payments_count = payments.count()
    invoice.internet_payments = payments.aggregate(Sum('internet_payment'))['internet_payment__sum']
    invoice.monthly_phone_payments = payments.aggregate(Sum('monthly_phone_payment'))['monthly_phone_payment__sum']
    invoice.mg_mn_payments = payments.aggregate(Sum('mg_mn_payment'))['mg_mn_payment__sum']
    invoice.equip_payments = payments.aggregate(Sum('equip_payment'))['equip_payment__sum']
    invoice.reinstall_payments = payments.aggregate(Sum('reinstall_payment'))['reinstall_payment__sum']
    invoice.other_payments = payments.aggregate(Sum('other_payment'))['other_payment__sum']
    invoice.total_payments = payments.aggregate(Sum('total'))['total__sum']
    invoice.is_waiting = True
    invoice.is_loaded = False

    invoice.save()

    return HttpResponseRedirect('/home')

@login_required
def clear_waiting_invoices_list(request):
    invoices = invoice_worker.get_inv_by_state(invoice_worker.get_inv_states().waiting)
    for inv in invoices.objects:
        invoice_worker.set_inv_state(
            invoice_id=inv.id, state_name=invoice_worker.get_inv_states().waiting, state=False
        )
        invoice_worker.set_inv_state(
            invoice_id=inv.id, state_name=invoice_worker.get_inv_states().uploaded, state=True
        )

    return redirect('/home/')

@login_required
def delete_invoice_from_list(request, invoice_id):
    invoice_worker.set_inv_state(
        invoice_id=invoice_id, state_name=invoice_worker.get_inv_states().waiting, state=False
    )
    invoice_worker.set_inv_state(
        invoice_id=invoice_id, state_name=invoice_worker.get_inv_states().uploaded, state=True
    )

    return redirect('/payments_in_invoice/{0}'.format(invoice_id))

# @login_required
# def delete_payments_from_log(request, invoice_id):
#     logger = Log()
#     logger.delete_payment_info_from_log(invoice=invoice_id)
#     return redirect('/home/')

@login_required
@csrf_exempt
def edit_payment(request, payment_id):
    payment = payment_worker.get(payment_id=payment_id)
    reports = Report.objects.all()[:10]
    user = request.user

    if request.method == 'POST':

        form = EditPaymentForm(request.POST, instance=payment)
        if form.is_valid():
            p_instance = form.save()
            p_instance.is_complited = False
            p_instance.save()
            return redirect('payments_in_invoice', invoice_id=payment.in_invoice.id)
    else:
        form = EditPaymentForm(instance=payment)

    all_info = invoice_worker.get_inv_info()
    all_info.update({'reports': reports, 'user': user, 'payment': payment, 'form': form})

    return render(request, 'n_payment.html', all_info)

@login_required
def make_payments(request):
    waiting_invoices = invoice_worker.get_inv_info()['waiting_inv']
    report_worker = ReportGenerator(waiting_invoices)
    payment_worker = UtmPayment()

    report_worker.generate_report()
    for invoice in waiting_invoices:
        payments = Payment.objects.filter(in_invoice=invoice.id)
        payment_worker.do_pay(payments)
        invoice.is_waiting = False
        invoice.is_processed = True
        invoice.save()

    return redirect('/home/')

@login_required
def download_report_file(request, report_id):
    report = Report.objects.get(id=report_id)
    file = report.file
    file_name = 'report_from_{0}.csv'.format(report.creation_date.strftime('%d-%m-%Y'))
    response = HttpResponse(file, content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename= "{}"'.format(file_name)

    return response