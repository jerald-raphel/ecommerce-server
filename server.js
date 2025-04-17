// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();
// const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/products');
// const smsRoutes = require('./routes/smsRoutes');
// app.use(cors());
// app.use(express.json());
// app.use('/api', authRoutes);
// app.use('/api', productRoutes);
// app.use('/api',smsRoutes);
// mongoose.connect('mongodb+srv://jerald-db:jerald07!@cluster0.ylfuz.mongodb.net/ecommerce', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'));

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize environment variables from .env file
dotenv.config();

const app = express();

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const smsRoutes = require('./routes/smsRoutes');

// Middleware
// Allow requests from specific frontend origin
const allowedOrigins = [
  'https://ecommerce-three-lac-40.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());

// Route handlers
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', smsRoutes);

// MongoDB connection using environment variable
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://jerald-db:jerald07!@cluster0.ylfuz.mongodb.net/ecommerce?retryWrites=true&w=majority';  // Use environment variable for security

mongoose.connect(mongoURI, { tls: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;  // Use environment variable for port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
