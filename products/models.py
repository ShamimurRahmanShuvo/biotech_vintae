from django.db import models
from django.utils.text import slugify


class Product(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    category = models.CharField(
        max_length=100,
        default="Herbal and Nutraceuticals"
    )
    therapeutic_class = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="e.g. Superfood / Nutritional Supplement"
    )
    short_description = models.TextField(
        blank=True,
        default="",
        help_text="Summary description for cards and listings."
    )
    presentation = models.CharField(
        max_length=255,
        blank=True,
        default="",
        help_text="e.g. Capsules in blister pack"
    )
    dosage_administration = models.TextField(
        blank=True,
        default="",
        help_text="e.g. 2 to 4 capsules daily or as advised by physician."
    )
    route_of_administration = models.CharField(
        max_length=100,
        default="Oral"
    )
    pharmacology_how_it_works = models.TextField(
        blank=True,
        null=True,
        verbose_name="Pharmacology / How It Works"
    )
    contraindications = models.TextField(blank=True, null=True)
    side_effects = models.TextField(blank=True, null=True)
    storage_conditions = models.CharField(
        max_length=255,
        default="Store in a cool and dry place away from direct sunlight. Keep out of reach of children."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class ProductCompositionItem(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="composition_rel",
        on_delete=models.CASCADE
    )
    group = models.CharField(
        max_length=150,
        help_text="e.g. Vitamins, Minerals, Antioxidants & Pigments"
    )
    name = models.CharField(
        max_length=255,
        help_text="e.g. Vitamin A (as beta-carotene) or Zinc, Magnesium, Calcium"
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.group}: {self.name}"


class ProductIndication(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="indications_rel",
        on_delete=models.CASCADE
    )
    text = models.CharField(
        max_length=500,
        help_text="e.g. Treatment and prevention of malnutrition"
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.text


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="products/")
    alt_text = models.CharField(max_length=255, blank=True)
    is_primary = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.product.name}"
