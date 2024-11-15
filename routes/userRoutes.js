const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
            await user.save();
            res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ - Obter todos os usuários
router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // READ - Obter um usuário por ID
  router.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // UPDATE - Atualizar um usuário por ID
  router.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // DELETE - Remover um usuário por ID
  router.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
      res.json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;