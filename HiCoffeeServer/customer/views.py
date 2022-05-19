from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from .serializers import *
from .models import *
from .pagination import DefaultPagination


class InformationViewSet(ModelViewSet):
    queryset = Information.objects.all()
    serializer_class = InformationSerializer


class HobbyViewSet(ModelViewSet):
    queryset = Hobby.objects.all()
    serializer_class = HobbySerializer


class CheckInViewSet(ModelViewSet):
    queryset = CheckInOrFavorite.objects.filter(type=1)
    serializer_class = CheckInOrFavoriteSerializer


class FavoriteViewSet(ModelViewSet):
    queryset = CheckInOrFavorite.objects.filter(type=2)
    serializer_class = CheckInOrFavoriteSerializer


class CheckInMakerViewSet(ModelViewSet):
    http_method_names = ['get']
    pagination_class = DefaultPagination
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CheckInMarkerSerializer

    def get_queryset(self):
        user = self.request.user
        info_id = Information.objects.only(
            'id').filter(user_id=user.id).first()
        return CheckInOrFavorite.objects.select_related('coffee_shop').filter(information_id=info_id, type=1)
