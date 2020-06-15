const app = require('./app');

const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  else console.log(`listening on port ${PORT}...`);
});
