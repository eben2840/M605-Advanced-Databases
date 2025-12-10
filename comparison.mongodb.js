use('Hospital');

// I used the  gt, gte, lt, lte, ne, in operators we used in class to filter patient records based on age, status, and blood type.

//  patients older than 40
db.patient.find({ age: { $gt: 40 } });

//  patients between ages 25-50
db.patient.find({ age: { $gte: 25, $lte: 50 } });

//  patients not discharged
db.patient.find({ status: { $ne: "Discharged" } });

//  patients with specific blood types
db.patient.find({ bloodType: { $in: ["O+", "A+", "B+"] } });

// patients younger than 30
db.patient.find({ age: { $lt: 30 } });

//  patients 50 or older
db.patient.find({ age: { $gte: 50 } });