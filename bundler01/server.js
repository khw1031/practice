const express = require('express');

const app = express();

app.use((_req, res, next) => {
  res.header('Cache-Control', 'no-cache');
  next();
});
app.use(express.static('dist'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.listen(7777, () => console.log(`server running on http://localhost:7777`));
