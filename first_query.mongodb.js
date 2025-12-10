use('Hospital');


//  all patients
db.patient.find();

//  patients by status
db.patient.find({ status: "Admitted" });

//  patients by gender
db.patient.find({ gender: "Female" });

//  patients by blood type
db.patient.find({ bloodType: "O+" });

//  total patients
db.patient.countDocuments();

//  one patient
db.patient.findOne({ name: "Mark Johnson" });