use('Hospital');

// Insert sample admins
db.Admin.insertMany([
  {
    username: "sarah",
    password: "admin123",
    email: "sarah.johnson@hospital.com",
  },
]);

// Insert sample patients
db.Patient.insertMany([
  {
    name: "Mark Johnson",
    age: 35,
    gender: "Male",
    bloodType: "O+",
    phoneNumber: 1234567890,
    address: "123 Main St",
    diagnosis: "Flu",
    assignedDoctor: "Dr. Smith",
    roomNumber: "101",
    admissionDate: "2024-01-15",
    status: "Admitted"
  },
  {
    name: "Ohene Nelson",
    age: 28,
    gender: "Female",
    bloodType: "A+",
    phoneNumber: 9876543210,
    address: "456 Oak Ave",
    diagnosis: "Fracture",
    assignedDoctor: "Dr. Johnson",
    roomNumber: "102",
    admissionDate: "2024-01-16",
    status: "Admitted"
  },
  {
    name: "Lily Johnqon",
    age: 58,
    gender: "Male",
    bloodType: "B-",
    phoneNumber: 5551234567,
    address: "789 Pine Rd",
    diagnosis: "Diabetes",
    assignedDoctor: "Dr. Williams",
    roomNumber: "103",
    admissionDate: "2024-01-14",
    status: "Discharged"
  }
]);

// View all patients
db.Patient.find();

// Find admitted patients
db.Patient.find({ status: "Admitted" });

// Find patients by doctor
db.Patient.find({ assignedDoctor: "Dr. Smith" });

// Update patient status
db.Patient.updateOne(
  { name: "Irene manny" },
  { $set: { status: "Discharged" } }
);

// Delete a patient
db.Patient.deleteOne({ name: "Bob Johnson" });

// Count total patients
db.Patient.countDocuments();
