"""
URL configuration for hos project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path ,include
from hmsapp import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('hmsapp.urls')),
    path('api/doctors/signup/', views.doctor_signup, name='doctor-signup'),
    path('api/doctor/login/', views.doctor_login,name='doctor_login'),
    path('api/patients/signup/', views.patient_signup, name='patient-signup'),
    path('api/patient/login/', views.patient_login,name='patient_login'),
    path('api/get_doctor_by_email/', views.get_doctor_by_email, name='get_doctor_by_email'),
    path('api/get_patient_by_email/', views.get_patient_by_email, name='get_patient_by_email'),
    path('api/prescriptions/', views.create_prescription, name='create_prescription'),
    path('api/patient/prescriptions/', views.get_patient_prescriptions, name='get_patient_prescriptions'),
    path('api/doctors/update-profile/', views.update_doctor_profile, name='update-doctor-profile'),
    path('api/doctors/', views.get_all_doctors, name='get-all-doctors'),
    path('api/available-wards/',views.get_available_wards, name='available-wards'),
    path('api/book-ward/', views.book_ward, name='book-ward'),
    path('api/patient/ward-bills/', views.get_patient_ward_bills, name='get-patient-ward-bills'),
    path('api/available-cabins/', views.get_available_cabins, name='available-cabins'),
    path('api/book-cabin/',views. book_cabin, name='book-cabin'),
    path('api/patient/cabin-bills/', views.get_patient_cabin_bills, name='get-patient-cabin-bills'),
    path('api/doctor/prescriptions/', views.get_doctor_prescriptions, name='get_doctor_prescriptions'),
    path('api/patients/', views.get_patients, name='get_patients'),
    path('api/blood-bank/', views.blood_bank_details, name='blood-bank-details'),
  

]

    
    




   



 
    
   

