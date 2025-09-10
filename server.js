const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const patientsRoutes = require('./routes/patients');
const professionalsRoutes = require('./routes/professionals');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/patients', patientsRoutes);
app.use('/professionals', professionalsRoutes);

app.get('/', (req, res) => {
  res.send('SGHSS - Protótipo simples funcionando 🚑');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));