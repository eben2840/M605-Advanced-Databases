use('Hospital');


// I used this to Count patients by status
db.patient.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  }
]);

// I used this to find the average age by gender
db.patient.aggregate([
  {
    $group: {
      _id: "$gender",
      averageAge: { $avg: "$age" }
    }
  }
]);

// I cout patients per doctor
db.patient.aggregate([
  {
    $group: {
      _id: "$assignedDoctor",
      patientCount: { $sum: 1 }
    }
  },
  { $sort: { patientCount: -1 } }
]);

// I made this for Age Breakdown
db.patient.aggregate([
  {
    $group: {
      _id: null,
      minAge: { $min: "$age" },
      maxAge: { $max: "$age" },
      avgAge: { $avg: "$age" },
      totalPatients: { $sum: 1 }
    }
  }
]);

// join patient with admin data
db.patient.aggregate([
  {
    $lookup: {
      from: "admin",
      localField: "assignedDoctor",
      foreignField: "fullName",
      as: "doctorInfo"
    }
  },
  { $limit: 5 }
]);

// Sort and limit
db.patient.aggregate([
  { $sort: { age: -1 } },
  { $limit: 10 },
  {
    $project: {
      name: 1,
      age: 1,
      diagnosis: 1
    }
  }
]);