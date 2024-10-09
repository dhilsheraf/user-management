const mongoose = require('mongoose');

const connectDB = async () => {
    try {
       const conn =  await mongoose.connect('mongodb://localhost:27017/userManagement');
        console.log(`mongoDB connected: ${conn.connection.host} `);
        
    } catch (error) {
        console.log(error.message);
        process.exit(1)
        
    }
} 

module.exports = connectDB