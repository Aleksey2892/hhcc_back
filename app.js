const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const cardsRoute = require('./routes/api/cardsRoute');

const app = express();
const port = 3001;

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/', cardsRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
