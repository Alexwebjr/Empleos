const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Server');
});

app.listen(3000, () => {
  console.log('App runing on port 3000');
});
