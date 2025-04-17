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

// ✅ Fixed CORS Configuration
const allowedOrigins = [
  'https://ecommerce-fawn-pi.vercel.app', // Frontend production URL
  'http://localhost:4000',                // Localhost for local testing
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests from the allowed origins or no origin (for Postman/Thunder Client)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // If you are using cookies or sessions
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ Apply middleware
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Route handlers
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', smsRoutes);

// ✅ MongoDB connection using environment variable
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://jerald-db:jerald07!@cluster0.ylfuz.mongodb.net/ecommerce?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { tls: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// ✅ Preflight handling for CORS
app.options('*', cors(corsOptions));  // Allow preflight requests for all routes

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
