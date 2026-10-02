from rest_framework import viewsets
from .models import LeadershipMessage, CompanyInfo
from .serializers import LeadershipMessageSerializer, CompanyInfoSerializer


class LeadershipViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LeadershipMessage.objects.all()
    serializer_class = LeadershipMessageSerializer


class CompanyInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CompanyInfo.objects.all()
    serializer_class = CompanyInfoSerializer
