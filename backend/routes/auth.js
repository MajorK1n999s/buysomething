import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
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

function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

// Check username uniqueness
router.post('/check-username', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ ok: false, error: 'username required' });
  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    return res.json({ ok: true, available: rows.length === 0 });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'db error' });
  }
});

// Register
router.post('/register', async (req, res) => {
  const { username, fullName, email, password, countryCode, mobile, address, city, state, country, pincode } = req.body;
  if (!username || !email || !password) return res.status(400).json({ ok: false, error: 'missing fields' });
  if (!validateEmail(email)) return res.status(400).json({ ok: false, error: 'invalid email' });
  try {
    const [exists] = await pool.query('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
    if (exists.length > 0) return res.status(409).json({ ok: false, error: 'username or email already exists' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (username, name, email, password_hash, country_code, phone, address, city, state, country, pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [username, fullName || '', email, hash, countryCode || '+91', mobile || '', address || '', city || '', state || '', country || '', pincode || '']
    );
    const userId = result.insertId;
    const token = jwt.sign({ id: userId, username }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return res.json({ 
      ok: true, 
      user: { 
        id: userId, 
        username, 
        fullName, 
        email, 
        countryCode,
        mobile,
        address,
        city,
        state,
        country,
        pincode
      }, 
      token 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'db error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  if (!usernameOrEmail || !password) return res.status(400).json({ ok: false, error: 'missing fields' });
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [usernameOrEmail, usernameOrEmail]);
    if (rows.length === 0) return res.status(401).json({ ok: false, error: 'invalid credentials' });
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ ok: false, error: 'invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return res.json({ 
      ok: true, 
      user: { 
        id: user.id, 
        username: user.username, 
        fullName: user.name, 
        email: user.email,
        countryCode: user.country_code,
        mobile: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        country: user.country,
        pincode: user.pincode,
        photo: user.image_path 
      }, 
      token 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'db error' });
  }
});

// Upload profile image
router.post('/upload-profile', upload.single('image'), async (req, res) => {
  const { userId } = req.body;
  if (!req.file) return res.status(400).json({ ok: false, error: 'no file' });
  const imagePath = `/uploads/${req.file.filename}`;
  try {
    if (userId) {
      await pool.query('UPDATE users SET image_path = ? WHERE id = ?', [imagePath, userId]);
    }
    return res.json({ ok: true, path: imagePath });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'db error' });
  }
});

export default router;
