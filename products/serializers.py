from rest_framework import serializers
from .models import Product, ProductIndication, ProductCompositionItem, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt_text", "is_primary"]


class ProductSerializer(serializers.ModelSerializer):
    indications = serializers.ListField(child=serializers.CharField(), required=False, write_only=True)
    composition = serializers.ListField(child=serializers.DictField(), required=False, write_only=True)
    indications_detail = serializers.SerializerMethodField(read_only=True)
    composition_detail = serializers.SerializerMethodField(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "category", "therapeutic_class", "short_description",
            "presentation", "dosage_administration", "route_of_administration", "indications",
            "indications_detail", "composition", "composition_detail", "pharmacology_how_it_works",
            "contraindications", "side_effects", "storage_conditions", "images", "created_at", "updated_at",
        ]

    def get_indications_detail(self, obj):
        return [item.text for item in obj.indications_rel.all()]

    def get_composition_detail(self, obj):
        return [{"group": item.group, "name": item.name} for item in obj.composition_rel.all()]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["indications"] = data.pop("indications_detail")
        data["composition"] = data.pop("composition_detail")
        return data

    def create(self, validated_data):
        indications_data = validated_data.pop("indications", [])
        composition_data = validated_data.pop("composition", [])
        product = Product.objects.create(**validated_data)
        for order, text in enumerate(indications_data):
            ProductIndication.objects.create(product=product, text=text, order=order)
        for order, comp in enumerate(composition_data):
            ProductCompositionItem.objects.create(product=product,
                                                  group=comp.get("group", "General"),
                                                  name=comp.get("name", ""),
                                                  order=order)
        return product

    def update(self, instance, validated_data):
        indications_data = validated_data.pop("indications", None)
        composition_data = validated_data.pop("composition", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if indications_data is not None:
            instance.indications_rel.all().delete()
            for order, text in enumerate(indications_data):
                ProductIndication.objects.create(product=instance, text=text, order=order)
        if composition_data is not None:
            instance.composition_rel.all().delete()
            for order, comp in enumerate(composition_data):
                ProductCompositionItem.objects.create(product=instance,
                                                      group=comp.get("group", "General"),
                                                      name=comp.get("name", ""),
                                                      order=order)
        return instance
