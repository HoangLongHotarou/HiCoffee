from django_filters.rest_framework import FilterSet
from django_filters import filters
from .models import CoffeeShop, CoffeeShopCategory
from .serializers import GetFilterCoffeeShopSerializer


class CoffeeShopFilter(FilterSet):
    id_categories = filters.CharFilter(method='filterCategories')
    id_hobbies_user = filters.CharFilter(method='filterForUser')

    class Meta:
        model = CoffeeShop
        fields = ('id_categories','id_hobbies_user')

    def filterCategories(self, queryset, name, value):
        ids_categories = value.split(',')
        ids_categories = [int(i) for i in ids_categories]
        coffeeShop = queryset.all()
        cfs = GetFilterCoffeeShopSerializer(coffeeShop, many=True)
        ids_coffee_shops = []
        for cf in cfs.data:
            check = True
            if len(cf['types_cfs']) == 0 or len(cf['types_cfs']) < len(ids_categories):
                continue
            types_cfs_id = [category['category']['id']
                            for category in cf['types_cfs']]
            for i in ids_categories:
                if i not in types_cfs_id:
                    check = False
                    break
            if check:
                ids_coffee_shops.append(cf['id'])
        queryset = queryset.filter(pk__in=ids_coffee_shops)
        return queryset

    def filterForUser(self, queryset, name, value):
        ids_hobbies = value.split(',')
        ids_hobbies = [int(i) for i in ids_hobbies]
        coffeeShop = queryset.all()
        cfs = GetFilterCoffeeShopSerializer(coffeeShop, many=True)
        ids_coffee_shops = []
        for cf in cfs.data:
            check = False
            if len(cf['types_cfs']) == 0:
                continue
            for category in cf['types_cfs']:
                if category['category']['id'] in ids_hobbies:
                    check = True
                    break
            if check:
                ids_coffee_shops.append(cf['id'])
        queryset = queryset.filter(pk__in=ids_coffee_shops)
        return queryset
