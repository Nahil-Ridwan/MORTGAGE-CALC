import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

const MortgageCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const handleCalculate = async () => {
    try {
      const res = await axios.post('https://mortgage-calc-backend.onrender.com/calculate', {
        principal,
        rate,
        years,
      });
      setMonthlyPayment(res.data.monthlyPayment);
    } catch (err) {
      console.error(err);
      setMonthlyPayment(null);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Mortgage Calculator</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Loan Amount" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
        <TextField label="Annual Interest Rate (%)" type="number" value={rate} onChange={e => setRate(e.target.value)} />
        <TextField label="Loan Term (Years)" type="number" value={years} onChange={e => setYears(e.target.value)} />
        <Button variant="contained" onClick={handleCalculate}>Calculate</Button>
        {monthlyPayment && (
          <Typography variant="h6" color="primary">
            Monthly Payment: ₹{monthlyPayment}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default MortgageCalculator;