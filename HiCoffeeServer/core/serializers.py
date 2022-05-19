from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from .models import *
from customer.models import Information


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password',
                  'email', 'first_name', 'last_name')

    def create(self, validated_data):
        try:
            user = self.perform_create(validated_data)
            Information.objects.create(user=user)
        except IntegrityError:
            self.fail("cannot_create_user")
        return user


class UserSerializer(BaseUserSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
