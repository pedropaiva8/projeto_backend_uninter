const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data/professionals.json');

function readData() {
  return JSON.parse(fs.readFileSync(filePath));
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Listar
router.get('/', (req, res) => {
  const data = readData();
  res.json(data);
});

// Criar
router.post('/', (req, res) => {
  const data = readData();
  const novoProfissional = { id: Date.now(), ...req.body };
  data.push(novoProfissional);
  writeData(data);
  res.status(201).json(novoProfissional);
});

// Atualizar (PUT)
router.put('/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  const idx = data.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ erro: 'Profissional não encontrado' });

  data[idx] = { id, ...req.body };
  writeData(data);
  res.json(data[idx]);
});

// Remover (DELETE)
router.delete('/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  const idx = data.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ erro: 'Profissional não encontrado' });

  const removido = data.splice(idx, 1)[0];
  writeData(data);
  res.json({ mensagem: 'Profissional removido', profissional: removido });
});

module.exports = router;
