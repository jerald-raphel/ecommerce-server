const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET total product count
router.get('/products/count', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching product count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new product with auto-incremented ID
router.post('/products', async (req, res) => {
  try {
    // Find the highest existing ID
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 34;

    // Remove any 'id' from the body to avoid client-side override
    const { id, ...safeData } = req.body;

    const newProduct = new Product({
      ...safeData,
      id: newId
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ id: 1 }); // Optional: sort by id
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10); // Convert from string to number
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/categories', async (req, res) => {
  try {
    // Using MongoDB's distinct method to get all unique categories from the Product collection
    const categories = await Product.distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
