const express = require('express');
const user = require('./src/routes/user.route.js');
const error = require('./src/middleware/error.js');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(user);

app.use(error);
