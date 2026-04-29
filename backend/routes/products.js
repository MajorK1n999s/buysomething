import express from 'express';
import pool from '../db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const uploadDir = path.join(process.cwd(), 'backend', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  }
});
const upload = multer({ storage });

// List products
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    return res.json({ ok: true, products: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'db error' });
  }
});

// Get product
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ ok: false, error: 'not found' });
    return res.json({ ok: true, product: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'db error' });
  }
});

// Create product (admin)
router.post('/', upload.array('images', 6), async (req, res) => {
  try {
    const { title, price, originalPrice, discount, category, shortDescription, description } = req.body;
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);
    const imagesJson = JSON.stringify(imagePaths);
    const [result] = await pool.query(
      'INSERT INTO products (title, price, original_price, discount, category, short_description, description, images_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, price || 0, originalPrice || null, discount || 0, category || '', shortDescription || '', description || '', imagesJson]
    );
    const newId = result.insertId;
    return res.json({ ok: true, id: newId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'db error' });
  }
});

// Update product
router.put('/:id', upload.array('images', 6), async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price, originalPrice, discount, category, shortDescription, description } = req.body;
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);
    const imagesJson = imagePaths.length > 0 ? JSON.stringify(imagePaths) : null;
    const fields = [];
    const values = [];
    if (title !== undefined) { fields.push('title = ?'); values.push(title); }
    if (price !== undefined) { fields.push('price = ?'); values.push(price); }
    if (originalPrice !== undefined) { fields.push('original_price = ?'); values.push(originalPrice); }
    if (discount !== undefined) { fields.push('discount = ?'); values.push(discount); }
    if (category !== undefined) { fields.push('category = ?'); values.push(category); }
    if (shortDescription !== undefined) { fields.push('short_description = ?'); values.push(shortDescription); }
    if (description !== undefined) { fields.push('description = ?'); values.push(description); }
    if (imagesJson) { fields.push('images_json = ?'); values.push(imagesJson); }
    if (fields.length === 0) return res.status(400).json({ ok: false, error: 'no fields' });
    values.push(id);
    const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
    await pool.query(sql, values);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'db error' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'db error' });
  }
});

export default router;
