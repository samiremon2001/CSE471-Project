from rest_framework import serializers
from .models import Doctor
from .models import Patient
from .models import Prescription
from .models import Ward
from .models import Cabin

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = [
            'first_name', 'last_name', 'sex', 'dob', 'email', 'phone', 
            'degree', 'medical_college', 'password', 'speciality', 'department','availability'
        ]

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        # fields = '__all__'
        fields = [
            'first_name',
            'last_name',
            'sex',
            'dob',
            'email',
            'phone',
            'bloodGroup',
            'password']

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'

class WardInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ward
        fields = ['ward_no', 'floor_no', 'ward_type', 'total_days', 'total_bill', 'booked_date']

class CabinInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cabin
        fields = ['cabin_no', 'floor_no', 'cabin_type', 'total_days', 'total_bill', 'booked_date']


