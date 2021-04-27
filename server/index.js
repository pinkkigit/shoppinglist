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



// app.get('/api/lists/:id/items', (request, response) => {
//   const id = request.params.id
//   const list = lists.find(list => list.id === id)
//   if(list) {
//     response.json(list.items)
//   } else {
//     response.status(404).end()
//   }
// })

// app.post('/api/lists/:id/items', (request, response) => {
//   const id = request.params.id
//   const list = lists.find(list => list.id === id)
//   const item = request.body
//   list.items = list.items.concat(item)

//   lists = lists.map(l => l.id === id ? list : l)
//   response.json(lists)
// })

// app.delete('/api/lists/:id/items/:itemId', (request, response) => {
//   const id = request.params.id
//   const list = lists.find(list => list.id === id)
//   const itemId = request.params.itemId
//   list.items = list.items.filter(l => l.id !== itemId)
//   lists = lists.map(l => l.id === id ? list : l)

//   response.status(204).end()
// })

// app.delete('/api/lists/:id/items', (request, response) => {
//   const id = request.params.id
//   const list = lists.find(list => list.id === id)
//   list.items = []
//   lists = lists.map(l => l.id === id ? list : l)

//   response.status(204).end()
// })

// app.put('/api/lists/:id/items/:itemId', (request, response) => {
//   const body = request.body
//   const id = request.params.id
//   const itemId = request.params.itemId
//   const list = lists.find(list => list.id === id)

//   const item = {
//     name: body.name,
//     quantity: body.quantity,
//     checked: body.checked,
//     id: itemId
//   }

//   list.items = list.items.map(i => i.id === itemId ? item : i)
//   lists = lists.map(l => l.id === id ? list : l)

//   response.json(item);
// })


app.use('/api/users', usersRouter);
app.use('/api/lists', listsRouter);
app.use('/api/lists', itemsRouter);

app.use(middleware.unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})