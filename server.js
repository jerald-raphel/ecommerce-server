const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const smsRoutes = require('./routes/smsRoutes');
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api',smsRoutes);
mongoose.connect('mongodb+srv://jerald-db:jerald07!@cluster0.ylfuz.mongodb.net/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
