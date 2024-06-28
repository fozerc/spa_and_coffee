from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in ['GET', 'HEAD'] or request.user.is_superuser


class IsOwnerOrReadOnly(BasePermission):
    message = 'You are not allowed to perform this action'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user

    def has_permission(self, request, view):
        return True
