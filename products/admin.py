from django.contrib import admin
from .models import Product, Ingredient, Indication


class IngredientInline(admin.TabularInline):
    model = Ingredient
    extra = 1


class IndicationInline(admin.TabularInline):
    model = Indication
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'presentation', 'is_featured', 'created_at')
    list_filter = ('category', 'is_featured', 'created_at')
    search_fields = ('name','short_description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [IngredientInline, IndicationInline]


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'amount', 'product')
    list_filter = ('name', 'product')
    search_fields = ('name','product__name')


@admin.register(Indication)
class IndicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'product')
    list_filter = ('name', 'product')
    search_fields = ('name','product__name')
