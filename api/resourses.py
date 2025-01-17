from datetime import timedelta, datetime
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from api.pagination import ReviewsPageNumberPagination
from api.permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly
from api.serializers import RegisterSerializer, CoffeeProductSerializer, CoffeeCategorySerializer, SpaUserSerializer, \
    EmployeeSerializer, ServiceRoleSerializer, ProcedureSerializer, CompositionSerializer, SalonSerializer, \
    ReviewSerializer, ScheduleSerializer, FreeTimeCalculator, RecordSerializer, GalleryCategorySerializer, \
    GalleryImageSerializer, ProcedureCategorySerializer, EmployeeReadSerializer, ReviewReadSerializer, BlogSerializer, \
    NewsSerializer
from spa_app.models import SpaUser, CoffeeProduct, CoffeeCategory, Employee, ServiceRole, Procedure, Composition, Salon, \
    Review, Schedule, Record, GalleryCategory, GalleryImage, ProcedureCategory, Blog, News
from spa_app.utils import SlotsValidator


class RegisterCreateApiView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = []
    queryset = SpaUser.objects.all()

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = SpaUser.objects.get(username=response.data['username'])
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)


class SpaUserModelViewSet(ModelViewSet):
    queryset = SpaUser.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = SpaUserSerializer


class EmployeeModelViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = EmployeeSerializer

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return EmployeeReadSerializer
        return EmployeeSerializer


class RoleModelViewSet(ModelViewSet):
    queryset = ServiceRole.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = ServiceRoleSerializer


class CoffeeProductModelViewSet(ModelViewSet):
    serializer_class = CoffeeProductSerializer
    permission_classes = []
    queryset = CoffeeProduct.objects.all()


class CoffeeCategoryModelViewSet(ModelViewSet):
    serializer_class = CoffeeCategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    queryset = CoffeeCategory.objects.all()


class ProcedureModelViewSet(ModelViewSet):
    queryset = Procedure.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = ProcedureSerializer


class CompositionModelViewSet(ModelViewSet):
    queryset = Composition.objects.all()
    serializer_class = CompositionSerializer
    permission_classes = [IsAdminOrReadOnly]


class PilingsProceduresView(ListAPIView):
    serializer_class = ProcedureSerializer

    def get_queryset(self):
        pilings_category = ProcedureCategory.objects.get(name='Пілінги')
        return Procedure.objects.filter(category_id=pilings_category.id)


class MassageProceduresView(ListAPIView):
    serializer_class = ProcedureSerializer

    def get_queryset(self):
        massage_category = ProcedureCategory.objects.get(name='Mасажі')
        return Procedure.objects.filter(category_id=massage_category.id)


class CeremoniesProceduresView(ListAPIView):
    serializer_class = ProcedureSerializer

    def get_queryset(self):
        ceremonies_category = ProcedureCategory.objects.get(name='Церемонії')
        return Procedure.objects.filter(category_id=ceremonies_category.id)


class SteamingAndScaldingProceduresView(ListAPIView):
    serializer_class = ProcedureSerializer

    def get_queryset(self):
        steaming_and_scalding = ProcedureCategory.objects.get(name='Пропарки і обгортання')
        return Procedure.objects.filter(category_id=steaming_and_scalding.id)


class TeasCafeListView(ListAPIView):
    serializer_class = CoffeeProductSerializer

    def get_queryset(self):
        teas = CoffeeCategory.objects.get(name='Чаї')
        return CoffeeProduct.objects.filter(category_id=teas.id)


class CoffeeCafeListView(ListAPIView):
    serializer_class = CoffeeProductSerializer

    def get_queryset(self):
        coffee = CoffeeCategory.objects.get(name='Кава')
        return CoffeeProduct.objects.filter(category_id=coffee.id)


class DessertsCafeListView(ListAPIView):
    serializer_class = CoffeeProductSerializer

    def get_queryset(self):
        desserts = CoffeeCategory.objects.get(name='Десерти')
        return CoffeeProduct.objects.filter(category_id=desserts.id)


class SpecialOffersCafeListView(ListAPIView):
    serializer_class = CoffeeProductSerializer

    def get_queryset(self):
        special = CoffeeCategory.objects.get(name='Спеціальні пропозиції')
        return CoffeeProduct.objects.filter(category_id=special.id)


class GallerySpaListView(ListAPIView):
    serializer_class = GalleryImageSerializer

    def get_queryset(self):
        spa = GalleryCategory.objects.get(name='Спа')
        return GalleryImage.objects.filter(category_id=spa.id)


class GalleryCafeListView(ListAPIView):
    serializer_class = GalleryImageSerializer

    def get_queryset(self):
        cafe = GalleryCategory.objects.get(name='Кав’ярня')
        return GalleryImage.objects.filter(category_id=cafe.id)


class GalleryProcessListView(ListAPIView):
    serializer_class = GalleryImageSerializer

    def get_queryset(self):
        process = GalleryCategory.objects.get(name='Процес')
        return GalleryImage.objects.filter(category_id=process.id)


class GalleryBathhouseListView(ListAPIView):
    serializer_class = GalleryImageSerializer

    def get_queryset(self):
        bathhouse = GalleryCategory.objects.get(name='Баня')
        return GalleryImage.objects.filter(category_id=bathhouse.id)


class SalonModelViewSet(ModelViewSet):
    queryset = Salon.objects.all()
    serializer_class = SalonSerializer
    permission_classes = [IsAdminOrReadOnly]


class LogoutApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response({"detail: Successfully logged out."}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({"detail": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED)


class ReviewModelViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerOrReadOnly]
    pagination_class = ReviewsPageNumberPagination

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return ReviewReadSerializer
        return ReviewSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ScheduleModelViewSet(ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=True, methods=['GET'])
    def free(self, request, pk=None):
        serializer = FreeTimeCalculator(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        procedure = serializer.validated_data['procedure']
        schedule = self.get_object()
        return Response({'ranges': SlotsValidator(schedule, procedure).ranges})


class RecordModelViewSet(ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [IsAuthenticated]


class GalleryCategoryModelViewSet(ModelViewSet):
    queryset = GalleryCategory.objects.all()
    serializer_class = GalleryCategorySerializer
    permission_classes = [IsAdminOrReadOnly]


class GalleryImageModelViewSet(ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAdminOrReadOnly]


class ProcedureCategoryModelViewSet(ModelViewSet):
    queryset = ProcedureCategory.objects.all()
    serializer_class = ProcedureCategorySerializer
    permission_classes = [IsAdminOrReadOnly]


class BlogModelViewSet(ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAdminOrReadOnly]


class NewsModelViewSet(ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [IsAdminOrReadOnly]
