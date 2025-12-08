require('dotenv').config();
const express = require('express');
const app = express();

const fs = require('fs');
const jwt = require('jsonwebtoken');
const { expressjwt: exjwt } = require('express-jwt');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

app.use(cors({
  origin: 'http://129.212.182.77',
  credentials: true
}));

app.use(express.json());

const port = process.env.PORT || 3000;

const secretKey = process.env.JWT_SECRET || 'dev-secret';
const jwtMW = exjwt({
  secret: secretKey,
  algorithms: ['HS256']
});

const sslConfig = process.env.DB_SSL_CA 
    ? { ca: fs.readFileSync(path.resolve(__dirname, process.env.DB_SSL_CA)) } 
    : {};


const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  port     : process.env.DB_PORT,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  // ssl      : { ca: fs.readFileSync(process.env.DB_SSL_CA) }
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1);
  } else { console.log('Connected to MySQL database.'); }
});

app.get('/', (req, res) => {
  res.send('API is running');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'stephanie' && password === 'stephanie') {
    const token = jwt.sign({ user: username }, secretKey, { expiresIn: '1m' });
    res.json({
      success: true,
      err: null,
      token
    });
  } else {
    res.status(401).json({
      success: false,
      token: null,
      err: 'Username or password is incorrect'
    });
  }
});

app.get('/api/chart1', jwtMW, (req, res) => {
  connection.query('SELECT * FROM chart1', (error, results) => {
    if (error) {
      console.error('DB query error for chart1:', error);
      return res.status(500).json({error: error.message });
    }
    res.json(results);
  });
});

app.get('/api/chart2', jwtMW, (req, res) => {
  connection.query('SELECT * FROM chart2', (error, results) => {
    if (error) {
      console.error('DB query error for chart2:', error);
      return res.status(500).json({error: error.message });
    }
    res.json(results);
  });
});

process.on('SIGINT', () => {
  console.log('\nShutting down server...');

  connection.end(err => {
    if (err) {
      console.error('Error closing MySQL connection:', err);
    } else {
      console.log('MySQL connection closed.');
    }
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});