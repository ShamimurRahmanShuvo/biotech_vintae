from django.contrib import admin
from .models import Product, ProductIndication, ProductCompositionItem, ProductImage


class ProductIndicationInline(admin.TabularInline):
    model = ProductIndication
    extra = 1
    fields = ('text', 'order')


class ProductCompositionItemInline(admin.TabularInline):
    model = ProductCompositionItem
    extra = 1
    fields = ('group', 'name', 'order')


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image', 'alt_text', 'is_primary')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'therapeutic_class', 'updated_at')
    list_filter = ('category', 'route_of_administration')
    search_fields = ('name', 'short_description', 'therapeutic_class')
    prepopulated_fields = {'slug': ('name',)}

    fieldsets = (
        (
            'Basic Identification', {
                "fields": ("name", "slug", "category", "therapeutic_class")
            }
        ),
        (
            "Overview & Administration", {
                "fields": (
                    "short_description",
                    "presentation",
                    "dosage_administration",
                    "route_of_administration",
                )
            }
        ),
        (
            "Pharmacology & Safety", {
                "classes": ("collapse",),
                "fields": (
                    "pharmacology_how_it_works",
                    "contraindications",
                    "side_effects",
                    "storage_conditions",
                )
            }
        ),
    )

    inlines = [ProductIndicationInline, ProductCompositionItemInline, ProductImageInline]
