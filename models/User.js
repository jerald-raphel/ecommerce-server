// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   address: String
// });

// module.exports = mongoose.model('User', userSchema);



const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  address: String,
  createdAt: { type: Date, default: Date.now },  // Add createdAt timestamp
});

// Create a TTL index on createdAt to delete documents after 60 seconds (1 minute)
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

module.exports = mongoose.model('User', userSchema);
