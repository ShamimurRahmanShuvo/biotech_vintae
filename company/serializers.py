from rest_framework import serializers
from .models import LeadershipMessage, CompanyInfo


class LeadershipMessageSerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source='get_role_display', read_only=True)

    class Meta:
        model = LeadershipMessage
        fields = ['id', 'name', 'role', 'role_display', 'phone_number', 'message']


class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = '__all__'
