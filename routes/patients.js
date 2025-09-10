const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data/patients.json');

router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

router.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const novoPaciente = { id: Date.now(), ...req.body };
  data.push(novoPaciente);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(201).json(novoPaciente);
});

module.exports = router;