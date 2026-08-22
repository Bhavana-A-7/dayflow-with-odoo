from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import (
    DepartmentViewSet,
    EmployeeViewSet,
    AttendanceViewSet,
    LeaveViewSet,
    PayrollViewSet,
    login_view,
    my_profile,
)


router = DefaultRouter()

router.register("departments", DepartmentViewSet)
router.register("employees", EmployeeViewSet)
router.register("attendance", AttendanceViewSet)
router.register("leaves", LeaveViewSet)
router.register("payroll", PayrollViewSet)


urlpatterns = router.urls + [
    path("login/", login_view),
    path("my-profile/", my_profile),
]