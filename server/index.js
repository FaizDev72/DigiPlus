const express = require('express');
const mongoose = require('mongoose');
const SimCard = require('./models/simModels');
const { dbConnect } = require('./config/db.conn');
require('dotenv').config;


const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

// MongoDB connection
dbConnect();


app.post('/activate', async (req, res) => {
  const { simNumber } = req.body;

  try {
    const simCard = await SimCard.findOne({ simNumber });
    if (!simCard) {
      return res.status(404).json({ error: 'SIM card not found' });
    }

    if (simCard.status === 'active') {
      return res.status(400).json({ error: 'SIM card is already active' });
    }

    simCard.status = 'active';
    simCard.activationDate = new Date();
    await simCard.save();

    res.status(200).json({ message: 'SIM card activated successfully', simCard });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/deactivate', async (req, res) => {
  const { simNumber } = req.body;

  try {
    const simCard = await SimCard.findOne({ simNumber });
    if (!simCard) {
      return res.status(404).json({ error: 'SIM card not found' });
    }

    if (simCard.status === 'inactive') {
      return res.status(400).json({ error: 'SIM card is already inactive' });
    }

    simCard.status = 'inactive';
    await simCard.save();

    res.status(200).json({ message: 'SIM card deactivated successfully', simCard });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/sim-details/:simNumber', async (req, res) => {
  const { simNumber } = req.params;

  try {
    const simCard = await SimCard.findOne({ simNumber });
    if (!simCard) {
      return res.status(404).json({ error: 'SIM card not found' });
    }

    res.status(200).json(simCard);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
