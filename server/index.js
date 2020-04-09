const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./config/config')

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const app = express()
app.use(cors())

app.use(require('./src/routes/photos'))

// Подключение к базе данных MongoDB
mongoose.Promise = global.Promise
mongoose.connect(config.dbURL, config.dbOptions)
mongoose.connection
  .once('open', () => {
    // Включение сервера
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))