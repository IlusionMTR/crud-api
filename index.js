const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Replace with your MongoDB Atlas connection string
const uri = 'mongodb+srv://bruno:admin@cluster0.fky3knq.mongodb.net/myDatabaseName?retryWrites=true&w=majority';

// Conexão com o MongoDB Atlas
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Rotas
app.use('/api', userRoutes);

// Função para listar as rotas
function listRoutes() {
  console.log('Rotas registradas na aplicação:');
  app._router.stack.forEach((middleware) => {
    if (middleware.route) { // Verifica se há uma rota definida
      const methods = Object.keys(middleware.route.methods)
        .map(method => method.toUpperCase())
        .join(', ');
      console.log(`${methods}: ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      // Se o middleware for um router, listar suas rotas
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods)
            .map(method => method.toUpperCase())
            .join(', ');
          console.log(`${methods}: ${middleware.regexp}${handler.route.path}`);
        }
      });
    }
  });
}

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  listRoutes(); // Chama a função para listar as rotas ao iniciar o servidor
});