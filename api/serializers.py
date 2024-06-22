from django.db.models import Q
from rest_framework import serializers
from spa_app.models import SpaUser, CoffeeProduct, CoffeeCategory, Procedure, Composition, Employee, \
    ServiceRole, Salon, Review


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = SpaUser
        fields = ['username', 'email', 'password', 'id']

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
        fields = ['name', 'description', 'price', 'image', 'category', 'id']


class ServiceRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRole
        fields = ['name', 'id', 'procedures']


class SpaUserSerializer(serializers.ModelSerializer):
    roles = ServiceRoleSerializer(many=True, read_only=True)

    class Meta:
        model = SpaUser
        fields = ['username', 'email', 'password', 'id', 'roles']


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedure
        fields = ['id', 'name', 'description', 'price', 'duration', 'composition', 'image']


class CompositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Composition
        fields = ['name', 'description', 'id']


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['user', 'salon', 'role', 'id', 'rating', 'review_count']


class ProcedureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedure
        fields = ['id', 'name', 'description', 'price', 'duration', 'composition', 'image']


class SalonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon
        fields = ['id', 'name', 'address', 'phone_number']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'user', 'therapist', 'rating', 'comment']
