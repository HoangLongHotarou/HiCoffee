from rest_framework import permissions
from .models import Information


class IsAdminOwnerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # if request.method in permissions.SAFE_METHODS:
        #     return True
        info = Information.objects.only('role').filter(
            user_id=request.user.pk).first()
        print(info)
        return bool(request.user and (request.user.is_staff or info.role == 2 if info != None else False))
