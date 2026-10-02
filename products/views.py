from rest_framework import viewsets
from .models import Product
from .serializers import ProductListSerializer, ProductDetailSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().order_by('-id')
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer

        return ProductListSerializer
