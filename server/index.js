const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Mortgage Calculator Backend is running');
});

app.post('/calculate', (req, res) => {
  const { principal, rate, years } = req.body;
  const P = parseFloat(principal);
  const r = parseFloat(rate) / 100 / 12;
  const n = parseInt(years) * 12;

  if (!P || !r || !n) return res.status(400).json({ error: 'Invalid input' });

  const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  res.json({ monthlyPayment: emi.toFixed(2) });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));