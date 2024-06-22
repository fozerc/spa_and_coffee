from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from api.resourses import RegisterCreateApiView, CoffeeProductModelViewSet, CoffeeCategoryModelViewSet, \
    EmployeeModelViewSet, RoleModelViewSet, ProcedureModelViewSet, CompositionModelViewSet, SalonModelViewSet, \
    ReviewModelViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'coffee-products', CoffeeProductModelViewSet, basename='coffee-products')
router.register(r'coffee-categories', CoffeeCategoryModelViewSet, basename='coffee-categories')
router.register(r'employee', EmployeeModelViewSet, basename='employee')
router.register(r'role', RoleModelViewSet, basename='role')
router.register(r'procedure', ProcedureModelViewSet, basename='procedure')
router.register(r'composition', CompositionModelViewSet, basename='composition')
router.register(r'salon', SalonModelViewSet, basename='salon')
router.register(r'review', ReviewModelViewSet, basename='review')

urlpatterns = [
    path('auth/', obtain_auth_token, name='auth_token'),
    path('register/', RegisterCreateApiView.as_view(), name='register'),
    path('', include(router.urls)),
]
