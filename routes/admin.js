const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Order = require("../models/Order");


const Product = require('../models/Product');
const Category = require('../models/Category');
const Client = require('../models/Client');
const Order = require('../models/Order');
const Promotion = require('../models/Promotion');

// --- CRUD Products ---
router.get('/products', auth, async (req,res)=>{
  const products = await Product.find().populate('category');
  res.json(products);
});
router.post('/products', auth, async (req,res)=>{
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});
router.put('/products/:id', auth, async (req,res)=>{
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(product);
});
router.delete('/products/:id', auth, async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// --- CRUD Categories ---
router.get('/categories', auth, async (req,res)=>{ res.json(await Category.find()); });
router.post('/categories', auth, async (req,res)=>{ const cat = new Category(req.body); await cat.save(); res.status(201).json(cat); });
router.put('/categories/:id', auth, async (req,res)=>{ const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new:true }); res.json(cat); });
router.delete('/categories/:id', auth, async (req,res)=>{ await Category.findByIdAndDelete(req.params.id); res.status(204).send(); });

// --- CRUD Clients ---
router.get('/clients', auth, async (req,res)=>{ res.json(await Client.find()); });
router.put('/clients/:id', auth, async (req,res)=>{ const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new:true }); res.json(client); });
router.delete('/clients/:id', auth, async (req,res)=>{ await Client.findByIdAndDelete(req.params.id); res.status(204).send(); });

// --- CRUD Orders ---
router.get('/orders', auth, async (req,res)=>{ res.json(await Order.find().populate('client').populate('products.product')); });
router.put('/orders/:id', auth, async (req,res)=>{ const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new:true }); res.json(order); });
router.delete('/orders/:id', auth, async (req,res)=>{ await Order.findByIdAndDelete(req.params.id); res.status(204).send(); });

// --- CRUD Promotions ---
router.get('/promotions', auth, async (req,res)=>{ res.json(await Promotion.find()); });
router.post('/promotions', auth, async (req,res)=>{ const promo = new Promotion(req.body); await promo.save(); res.status(201).json(promo); });
router.put('/promotions/:id', auth, async (req,res)=>{ const promo = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new:true }); res.json(promo); });
router.delete('/promotions/:id', auth, async (req,res)=>{ await Promotion.findByIdAndDelete(req.params.id); res.status(204).send(); });

// --- Statistiques ---
router.get('/stats/sales', auth, async (req,res)=>{
  const orders = await Order.find();
  const total = orders.reduce((acc,o)=>acc+o.total,0);
  res.json({ total_sales: total, total_orders: orders.length });
});
router.get('/stats/popular-products', auth, async (req,res)=>{
  const orders = await Order.find().populate('products.product');
  const map = {};
  orders.forEach(o => o.products.forEach(p=>{
    map[p.product._id] = (map[p.product._id]||0)+p.quantity;
  }));
  const sorted = Object.entries(map).sort((a,b)=>b[1]-a[1]);
  res.json(sorted);
});
router.use((req, res, next) => {
  if (req.headers.authorization !== "ADMIN_SECRET_123") {
    return res.sendStatus(403);
  }
  next();
});

router.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
