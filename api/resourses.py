from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet

from api.serializers import RegisterSerializer, CoffeeProductSerializer, CoffeeCategorySerializer
from spa_app.models import SpaUser, CoffeeProduct, CoffeeCategory


class RegisterCreateApiView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = []
    queryset = SpaUser.objects.all()


class SpaUserModelViewSet(ModelViewSet):
    queryset = SpaUser.objects.all()


class CoffeeProductModelViewSet(ModelViewSet):
    serializer_class = CoffeeProductSerializer
    permission_classes = []
    queryset = CoffeeProduct.objects.all()


class CoffeeCategoryModelViewSet(ModelViewSet):
    serializer_class = CoffeeCategorySerializer
    permission_classes = []
    queryset = CoffeeCategory.objects.all()

