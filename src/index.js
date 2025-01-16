const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

// Rota para obter todos os usuários
app.get('/users', (req, res) => {
  res.json(users);
});

// Rota para adicionar um novo usuário
app.post('/users', (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: 'ID e nome são obrigatórios!' });
  }

  users.push({ id, name });
  res.status(201).json({ message: 'Usuário adicionado com sucesso!', user: { id, name } });
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
