from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer, SendEmailResetSerializer as BaseSendEmailResetSerializer
from djoser.conf import settings
from .models import *
from customer.models import Information
from djoser.compat import get_user_email, get_user_email_field_name
from rest_framework import serializers


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
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
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class UserNameSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ('id', 'username',)


class SendEmailResetSerializer(BaseSendEmailResetSerializer):
    def get_user(self, is_active=True):
        try:
            user = User.objects.get(
                # is_active=is_active,
                # **{self.email_field: self.data.get(self.email_field, "")},
                email=self.data.get(self.email_field, ""),
            )
            if user.has_usable_password():
                return user
        except User.DoesNotExist:
            pass
        if (
            settings.PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND
            or settings.USERNAME_RESET_SHOW_EMAIL_NOT_FOUND
        ):
            self.fail("email_not_found")

    # default_error_messages = {
    #     "email_not_found": settings.CONSTANTS.messages.EMAIL_NOT_FOUND
    # }

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.email_field = get_user_email_field_name(User)
    #     self.fields[self.email_field] = serializers.EmailField()
