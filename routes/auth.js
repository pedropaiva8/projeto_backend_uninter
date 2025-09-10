const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  if (email === 'admin@vidaplus.com' && senha === '123') {
    res.json({ mensagem: 'Login bem-sucedido', token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ erro: 'Credenciais inválidas' });
  }
});

module.exports = router;