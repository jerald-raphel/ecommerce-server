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
const app = express();

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const smsRoutes = require('./routes/smsRoutes');

// Middleware
app.use(cors({
  origin: 'https://ecommerce-svay.vercel.app/', // 🔁 Replace with your actual Vercel frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Route handlers
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', smsRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://jerald-db:jerald07!@cluster0.ylfuz.mongodb.net/ecommerce?retryWrites=true&w=majority', {
  tls: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
