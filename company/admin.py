from django.contrib import admin
from .models import LeadershipMessage, CompanyInfo


@admin.register(LeadershipMessage)
class LeadershipMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'phone_number')


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'office_address')
