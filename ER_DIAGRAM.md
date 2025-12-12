# Hospital Management System - ER Diagram

## Entity Relationship Diagram (NoSQL Document Structure)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           HOSPITAL DATABASE                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐         ┌─────────────────────────────────┐
│            PATIENT              │         │             ADMIN               │
├─────────────────────────────────┤         ├─────────────────────────────────┤
│ _id: ObjectId (PK)              │         │ _id: ObjectId (PK)              │
│ name: String                    │         │ username: String                │
│ age: Number                     │         │ password: String                │
│ gender: String                  │         │ email: String                   │
│ bloodType: String               │         │ role: String                    │
│ phoneNumber: Number             │         │ fullName: String                │
│ address: String                 │         │ department: String              │
│ diagnosis: String               │         └─────────────────────────────────┘
│ assignedDoctor: String (FK)     │                        │
│ roomNumber: String              │                        │
│ admissionDate: String           │                        │
│ status: String                  │                        │
└─────────────────────────────────┘                        │
                │                                          │
                │                                          │
                │         ┌─────────────────────────────────┘
                │         │
                │         │ RELATIONSHIP: assignedDoctor → fullName
                │         │ TYPE: Many-to-One (M:1)
                │         │ DESCRIPTION: Multiple patients can be 
                │         │              assigned to one doctor
                └─────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              INDEXES                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ PATIENT COLLECTION:                                                         │
│ • { status: 1 }                    - Single field index                    │
│ • { assignedDoctor: 1 }            - Single field index                    │
│ • { age: 1 }                       - Single field index                    │
│ • { name: "text", diagnosis: "text" } - Text search index                  │
│ • { status: 1, assignedDoctor: 1, age: 1 } - Compound index               │
│                                                                             │
│ ADMIN COLLECTION:                                                           │
│ • { username: 1 }                  - Unique index for login                │
│ • { email: 1 }                     - Single field index                    │
│ • { fullName: 1 }                  - Single field index for lookups        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          SAMPLE DATA STRUCTURE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ PATIENT DOCUMENT EXAMPLE:                                                   │
│ {                                                                           │
│   "_id": ObjectId("674d1234567890abcdef1234"),                             │
│   "name": "John Anderson",                                                  │
│   "age": 45,                                                                │
│   "gender": "Male",                                                         │
│   "bloodType": "O+",                                                        │
│   "phoneNumber": 5551234567,                                                │
│   "address": "123 Healthcare Drive",                                        │
│   "diagnosis": "Hypertension",                                              │
│   "assignedDoctor": "Dr. Sarah Johnson",                                    │
│   "roomNumber": "A-204",                                                    │
│   "admissionDate": "2024-01-15",                                            │
│   "status": "Admitted"                                                      │
│ }                                                                           │
│                                                                             │
│ ADMIN DOCUMENT EXAMPLE:                                                     │
│ {                                                                           │
│   "_id": ObjectId("674d5678901234abcdef5678"),                             │
│   "username": "dr_sarah",                                                   │
│   "password": "hashed_password",                                            │
│   "email": "sarah.johnson@hospital.com",                                    │
│   "role": "Doctor",                                                         │
│   "fullName": "Dr. Sarah Johnson",                                          │
│   "department": "Cardiology"                                                │
│ }                                                                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            QUERY PATTERNS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. LOOKUP OPERATION (JOIN):                                                 │
│    db.patient.aggregate([                                                   │
│      {                                                                      │
│        $lookup: {                                                           │
│          from: "admin",                                                     │
│          localField: "assignedDoctor",                                      │
│          foreignField: "fullName",                                          │
│          as: "doctorInfo"                                                   │
│        }                                                                    │
│      }                                                                      │
│    ])                                                                       │
│                                                                             │
│ 2. AGGREGATION BY DOCTOR:                                                   │
│    db.patient.aggregate([                                                   │
│      {                                                                      │
│        $group: {                                                            │
│          _id: "$assignedDoctor",                                            │
│          patientCount: { $sum: 1 }                                          │
│        }                                                                    │
│      }                                                                      │
│    ])                                                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         CARDINALITY RELATIONSHIPS                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ PATIENT ──────── ADMIN                                                      │
│    M    :    1                                                              │
│                                                                             │
│ • One doctor (admin) can treat multiple patients                            │
│ • Each patient is assigned to exactly one doctor                            │
│ • Relationship maintained through assignedDoctor field                      │
│ • Foreign key reference: patient.assignedDoctor → admin.fullName           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           BUSINESS RULES                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. Each patient must have an assigned doctor                                │
│ 2. Patient status can be: Admitted, Discharged, Critical, Recovering       │
│ 3. Blood types follow standard medical notation (A+, B-, O+, AB+, etc.)    │
│ 4. Admin roles include: Doctor, Administrator, Nurse                       │
│ 5. Room numbers follow format: [Building]-[Room] (e.g., A-204)             │
│ 6. Admission dates stored as strings in YYYY-MM-DD format                  │
└─────────────────────────────────────────────────────────────────────────────┘