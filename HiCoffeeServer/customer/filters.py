from django_filters.rest_framework import FilterSet
from .models import CheckInOrFavorite


class CheckInOrFavoriteFilter(FilterSet):
    class Meta:
        model = CheckInOrFavorite
        fields = {
            'type': ['exact'],
        }
