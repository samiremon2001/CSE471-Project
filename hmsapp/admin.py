from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Doctor, Patient, Ward

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name','sex','dob' ,'email', 'phone',"speciality","department"]

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name','sex','dob', 'email', 'phone']
