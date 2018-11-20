"""UPayment_Django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from upayment import views
from django.conf import settings
from django.contrib.staticfiles.urls import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.sign_in),
    path('sign_in/', views.sign_in, name='sign_in'),
    path('login_user/', views.login_user, name='login_user'),
    path('send_admin_mail/', views.send_admin_mail, name='send_admin_mail'),
    path('logout_user/', views.logout_user, name='logout_user'),
    path('home/', views.home),
    path('upload_invoice/<str:profile_type>/<int:profile_id>', views.upload_invoice),
    path('reports/', views.reports),
    path('utm_settings/', views.utm_settings),
    path('sbr_profiles/', views.sbr_profiles),
    path('create_sbr_parser_profile/', views.create_sbr_parser_profile),
    path('edit_sbr_parser_profile/<int:profile_id>', views.edit_sbr_parser_profile),
    path('delete_sbr_parser_profile/<int:profile_id>', views.delete_sbr_parser_profile),
    path('confirm_correctness_invoice/<int:invoice_id>', views.confirm_correctness_invoice, name='confirm_correctness_invoice'),
    path('delete_upload_invoice/<int:invoice_id>', views.delete_upload_invoice, name='delete_upload_invoice'),
    path('payments_in_invoice/<int:invoice_id>', views.payments_in_invoice, name='payments_in_invoice'),
    path('processed_invoices/<int:invoice_id>', views.processed_invoices, name='processed_invoices'),
    path('waiting_invoices/', views.waiting_invoices, name='waiting_invoices'),
    path('delete_invoice_from_list/<int:invoice_id>', views.delete_invoice_from_list, name='delete_invoice_from_list'),
    path('clear_waiting_invoices_list/', views.clear_waiting_invoices_list, name='clear_waiting_invoices_list'),
    # path('delete_payments_from_log/<int:invoice_id>', views.delete_payments_from_log),
    path('edit_payment/<int:payment_id>', views.edit_payment, name='edit_payment'),
    path('download_report_file/<int:report_id>', views.download_report_file),
    path('make_payments/', views.make_payments, name='make_payments')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)