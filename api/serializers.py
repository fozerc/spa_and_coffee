from django.db.models import Q
from rest_framework import serializers
from spa_app.models import SpaUser, CoffeeProduct, CoffeeCategory, Procedure, Composition, Employee, ServiceRole, Salon, \
    Review, Schedule, Record, GalleryCategory, GalleryImage, ProcedureCategory, News, Blog
from spa_app.utils import SlotsValidator


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    phone = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = SpaUser
        fields = ['username', 'phone', 'email', 'password', 'id']

    def validate(self, attrs):
        username = attrs.get('username')
        email = attrs.get('email')
        user_exist = Q(username__iexact=username) | Q(email__iexact=email)
        if SpaUser.objects.filter(user_exist).count():
            raise serializers.ValidationError()
        return attrs

    def create(self, validated_data):
        return SpaUser.objects.create_user(**validated_data)


class CoffeeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeCategory
        fields = ['name', 'id']

    def validate(self, attrs):
        name = attrs.get('name')
        name_exist = Q(name__iexact=name)
        if CoffeeCategory.objects.filter(name_exist).count():
            raise serializers.ValidationError()
        return attrs


class CoffeeProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeProduct
        fields = ['name', 'description', 'price', 'image', 'category', 'id', 'compound']


class CompositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Composition
        fields = ['name', 'product_component', 'id', 'firm', 'contraindications']


class EmployeeSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=SpaUser.objects.all())
    salon = serializers.PrimaryKeyRelatedField(queryset=Salon.objects.all())
    role = serializers.PrimaryKeyRelatedField(queryset=ServiceRole.objects.all(), many=True)

    class Meta:
        model = Employee
        fields = ['user', 'salon', 'role', 'id', 'rating', 'review_count', 'name', 'photo']

    def create(self, validated_data):
        role = validated_data.pop('role')
        employee = Employee.objects.create(**validated_data)
        employee.role.set(role)
        self.set_admin_permissions(employee)
        return employee

    def update(self, instance, validated_data):
        roles = validated_data.pop('role')
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.role.set(roles)
        instance.save()
        self.set_admin_permissions(instance)
        return instance

    def set_admin_permissions(self, employee):
        user = employee.user
        if employee.role.filter(is_admin=True).exists():
            user.is_superuser = True
            user.is_staff = True
        else:
            user.is_superuser = False
            user.is_staff = False
        user.save()


class ProcedureSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=ProcedureCategory.objects.all())

    class Meta:
        model = Procedure
        fields = ['id', 'name', 'description', 'price', 'duration', 'composition', 'image', 'category']


class ServiceRoleSerializer(serializers.ModelSerializer):
    procedures = ProcedureSerializer(many=True, read_only=True)

    class Meta:
        model = ServiceRole
        fields = ['name', 'id', 'procedures', 'is_admin', 'employees']


class SpaUserSerializer(serializers.ModelSerializer):
    roles = ServiceRoleSerializer(many=True, read_only=True)

    class Meta:
        model = SpaUser
        fields = ['username', 'email', 'password', 'id', 'roles']


class SalonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon
        fields = ['id', 'name', 'address', 'phone_number']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'user', 'therapist', 'rating', 'comment']
        extra_kwargs = {'rating': {'required': True}}
        read_only_fields = ('user',)

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class ReviewReadSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(source='user.profile_image')
    user = serializers.CharField(source='user.username')
    therapist = serializers.CharField(source='therapist.name')

    class Meta:
        model = Review
        fields = ['id', 'user', 'therapist', 'rating', 'comment', 'image']


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['id', 'employee', 'start_time', 'end_time', 'day']


class EmployeeReadSerializer(serializers.ModelSerializer):
    role = serializers.StringRelatedField(many=True)

    class Meta:
        model = Employee
        fields = ['id', 'name', 'role', 'photo', 'rating']


class RecordSerializer(serializers.ModelSerializer):
    start_time = serializers.TimeField(required=True)

    class Meta:
        model = Record
        fields = ['id', 'schedule', 'start_time', 'procedure', 'start_time']

    def validate(self, data):
        if data['start_time'].strftime('%H:%M') not in SlotsValidator(data['schedule'], data['procedure']).ranges:
            raise serializers.ValidationError("Sorry, but date is booked")
        return data


class FreeTimeCalculator(serializers.Serializer):
    procedure = serializers.PrimaryKeyRelatedField(queryset=Procedure.objects.all())


class GalleryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryCategory
        fields = ['id', 'name']


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ['id', 'category', 'image']


class ProcedureCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcedureCategory
        fields = ['id', 'name', 'description', 'image', 'roles']


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'name', 'description', 'image', 'support_image']


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'name', 'description', 'image', 'support_image']
