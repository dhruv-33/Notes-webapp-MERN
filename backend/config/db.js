const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('\n==== Database Connection Info ====');
        console.log('Connection Status: Success');
        console.log('================================\n');
    } catch (error) {
        console.log('\n==== Database Connection Error ====');
        console.error('Connection Status: Failed');
        console.error('Error Details:', error.message);
        console.log('=================================\n');
        process.exit(1);
    }
};

module.exports = connectDB;