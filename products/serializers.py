from rest_framework import serializers
from .models import Product, Ingredient, Indication


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'amount', 'role_description']


class IndicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indication
        fields = ['id', 'condition_name']


class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'category', 'short_description', 'presentation', 'is_featured', 'image']


class ProductDetailSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    indications = IndicationSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
