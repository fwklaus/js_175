const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = 3000;

APP.set('view engine', 'pug');

APP.get('/', (req, res) => {
  // res.send('<h1>Hello World!</h1>');
  res.render('index');
});

APP.get('/account', (req, res) => {
  res.render('account', { money: '$100', recentTransaction: true });
});

APP.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
