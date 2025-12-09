# MongoDB Hospital Management System

A MongoDB database project for managing hospital operations including customer orders and sales data.

## Database Architecture

### Database: Hospital
**Collections:**
- `Patient` - Stores patient information

**Schema:**
```javascript
// Customer Collection
{
  _id: ObjectId,
  // customer fields
}



## How to Run

### Prerequisites
- MongoDB 8.2.2 or higher
- MongoDB Shell (mongosh) 2.1.1 or higher

### Steps

1. **Start MongoDB Server:**
```bash
mkdir -p /tmp/mongodb
mongod --dbpath /tmp/mongodb
```

2. **Open new terminal and connect:**
```bash
mongosh
```
