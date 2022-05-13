from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from .models import *


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password',
                  'email', 'first_name', 'last_name')


class UserSerializer(BaseUserSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
