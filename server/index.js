const config = require('./utils/config');
const express = require('express');
const app = express();
const middleware = require('./utils/middleware');
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const listsRouter = require('./controllers/lists');
const itemsRouter = require('./controllers/items');

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true
}).then(() => {
  logger.info('connected to MongoDB')
}).catch((error) => {
  logger.error('error connection to MongoDB:', error.message);
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)


app.use('/api/users', usersRouter);
app.use('/api/lists', listsRouter);
app.use('/api/lists', itemsRouter);

app.use(middleware.unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})