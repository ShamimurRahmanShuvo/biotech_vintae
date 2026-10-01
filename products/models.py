from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)  # e.g., US Joint Max, US Bion
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=100, default="Dietary & Nutritional Supplement")
    short_description = models.TextField()
    dosage_instructions = models.CharField(
        max_length=200,
        default="1 or 2 tablet daily or as directed by health expert")
    presentation = models.CharField(max_length=100, default="3x10 Tablets per monopack")
    route_of_admin = models.CharField(max_length=50, default="Oral")
    storage_conditions = models.TextField(
        default="Store in a cool & dry place. Protect from direct sunlight, "
                "heat & moisture. Keep out of reach of children."
    )
    precautions = models.TextField(blank=True, null=True)
    side_effects = models.TextField(
        default="Generally well tolerated. Rarely constipation, stomach ache, loss of appetite."
    )
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    is_featured = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    product = models.ForeignKey(Product, related_name='ingredients', on_delete=models.CASCADE)
    name = models.CharField(max_length=100) # e.g., Glucosamine, Chondroitin
    amount = models.CharField(max_length=50)  # e.g., 500 mg, 200 mg
    role_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.amount}) - {self.product.name}"


class Indication(models.Model):
    product = models.ForeignKey(Product, related_name='indications', on_delete=models.CASCADE)
    condition_name = models.CharField(max_length=150) # e.g., Osteoarthritis, Diabetic Neuropathy

    def __str__(self):
        return f"{self.condition_name} ({self.product.name})"
