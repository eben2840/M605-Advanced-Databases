use('Hospital');


// Update single patient status
db.Patient.updateOne(
  { name: "Lily Johnqon" },
  { $set: { status: "Discharged" } }
);

// Update multiple patients room numbers
db.Patient.updateMany(
  { assignedDoctor: "Dr. Smith" },
  { $set: { roomNumber: "1290" } }
);


// Increment age by 1 for all patients
db.Patient.updateMany(
  {},
  { $inc: { age: 1 } }
);


// all my delete queries

// Delete discharged patients
db.Patient.deleteMany({ status: "Discharged" });

// Delete specific patient
db.Patient.deleteOne({ name: "Mark Johnson" });