const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://root:example@127.0.0.1:27018/users'//process.env.MONGO_URI;

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('Users', userSchema);

async function createUser() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      email: 'admin@admin.com',
      password: hashedPassword, // In a real application, make sure to hash the password
      role: 'admin'
    });

    await user.save();
    console.log('User created');

    mongoose.disconnect();
  } catch (error) {
    if(error.code == 11000) {
      console.log('user is exist')
      process.exit(0)
    }
    else {
      console.error('Error connecting to MongoDB or creating user:', error);
      process.exit(1)
    }
  }
}

createUser();
