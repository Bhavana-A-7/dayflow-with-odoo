from rest_framework.routers import DefaultRouter
from .views import (
    DepartmentViewSet,
    EmployeeViewSet,
    AttendanceViewSet,
    LeaveViewSet,
)

router = DefaultRouter()

router.register("departments", DepartmentViewSet)
router.register("employees", EmployeeViewSet)
router.register("attendance", AttendanceViewSet)
router.register("leaves", LeaveViewSet)

urlpatterns = router.urls