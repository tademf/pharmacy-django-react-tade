from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from pharmacy.views import MedicineViewSet, register, login, get_user

router = DefaultRouter()
router.register(r'medicines', MedicineViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', register, name='register'),
    path('api/login/', login, name='login'),
    path('api/user/', get_user, name='get_user'),
]