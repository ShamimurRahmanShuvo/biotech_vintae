from django.contrib import admin
from .models import LeadershipMessage, CompanyInfo


@admin.register(LeadershipMessage)
class LeadershipMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'phone_number')
    list_filter = (
        "role",
    )
    search_fields = (
        "name",
        "role",
        "phone_number",
    )
    ordering = ("role", "name",)
    fieldsets = (
        (
            "Leadership Information",
            {"fields":
                 (
                     "name", "role", "phone_number",
                 ),
            },
        ),
        (
            "Message",
            {"fields":
                (
                     "message",
                ),
            },
        ),
    )


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'office_address')
    search_fields = (
        "company_name",
        "office_address",
        "mission",
        "vision"
    )
    ordering = ("company_name",)
    fieldsets = (
        (
            "Company Information",
            {
                "fields": (
                    "company_name",
                    "office_address",
                ),
            },
        ),
        (
            "Mission & Vision",
            {
                "fields": (
                    "mission",
                    "vision",
                ),
            },
        ),
    )
