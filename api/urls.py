from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from api.resourses import RegisterCreateApiView, CoffeeProductModelViewSet, CoffeeCategoryModelViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'products', CoffeeProductModelViewSet, basename='coffeeproducts')
router.register(r'categories', CoffeeCategoryModelViewSet, basename='coffeecategories')

urlpatterns = [
    path('auth/', obtain_auth_token, name='auth_token'),
    path('register/', RegisterCreateApiView.as_view(), name='register'),
    path('', include(router.urls)),
]
