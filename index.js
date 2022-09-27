const db = require('./models');
const app = require('./app');

const PORT = process.env.PORT || 5000;

db.sequelize.authenticate().then(
  () => {
    console.log('Connected to the database succesfully!');
    app.listen(PORT, (err) => {
      if (err) {
        return console.error('Failed', err);
      }
      console.log(`Server is listening in port ${PORT}`)
      return app
    })
  }
).catch((err) => console.error('Unable to connect to the database', err));