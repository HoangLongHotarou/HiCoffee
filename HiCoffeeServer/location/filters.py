from django_filters.rest_framework import FilterSet
from django_filters import filters
from .models import CoffeeShop, CoffeeShopCategory


class CoffeeShopFilter(FilterSet):
    id_categories = filters.CharFilter(method='filterCategories')

    class Meta:
        model = CoffeeShop
        fields = ('id_categories',)

    def filterCategories(self, queryset, name, value):
        ids = value.split(',')
        ids = [int(i) for i in ids]
        print(ids)
        # cfs_id = CoffeeShopCategory.objects.only('coffee_shop_id').filter(
        #     category_id__in=ids).values_list('coffee_shop', flat=True)
        # print(cfs_id)
        queryset = queryset.filter(id=1)
        print(queryset)
        return queryset
