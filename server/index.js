const config = require('./utils/config');
const express = require('express');
const app = express();
const middleware = require('./utils/middleware');
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

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

let users = [
  {
    "username": "aa",
    "password": "asd",
    "id": 1
  },
  {
    "username": "we",
    "password": "qwe",
    "id": 2
  },
  {
    "username": "qq",
    "password": "asd",
    "id": 3
  }
]

let lists = [
  {
    "items": [
      {
        "name": "sdf",
        "quantity": 1,
        "checked": false,
        "id": "8c0bf163-b743-4c14-b106-bf8974fa76c4"
      },
      {
        "name": "asd",
        "quantity": 1,
        "checked": false,
        "id": "8c0bf163-b743-4c14-b106-bf8974fa76c5"
      }
    ],
    "id": "66c68c38-ef76-474a-972d-4afbd2deb252"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>hello</h1>');
})

app.get('/api/lists', (req, res) => {
  res.json(lists)
})

app.get('/api/lists/:id', (request, response) => {
  const id = request.params.id
  const list = lists.find(list => list.id === id)
  if(list) {
    response.json(list)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/lists/:id', (request, response) => {
  const id = request.params.id
  lists = lists.filter(list => list.id !== id)

  response.status(204).end()
})

app.post('/api/lists', (request, response) => {  
  console.log('creating a list')
  const list = request.body
  console.log(list)  
  lists = lists.concat(list)
  response.json(list)
})

app.get('/api/lists/:id/items', (request, response) => {
  const id = request.params.id
  const list = lists.find(list => list.id === id)
  if(list) {
    response.json(list.items)
  } else {
    response.status(404).end()
  }
})

app.post('/api/lists/:id/items', (request, response) => {
  const id = request.params.id
  const list = lists.find(list => list.id === id)
  const item = request.body
  list.items = list.items.concat(item)

  lists = lists.map(l => l.id === id ? list : l)
  response.json(lists)
})

app.delete('/api/lists/:id/items/:itemId', (request, response) => {
  const id = request.params.id
  const list = lists.find(list => list.id === id)
  const itemId = request.params.itemId
  list.items = list.items.filter(l => l.id !== itemId)
  lists = lists.map(l => l.id === id ? list : l)

  response.status(204).end()
})

app.delete('/api/lists/:id/items', (request, response) => {
  const id = request.params.id
  const list = lists.find(list => list.id === id)
  list.items = []
  lists = lists.map(l => l.id === id ? list : l)

  response.status(204).end()
})

app.put('/api/lists/:id/items/:itemId', (request, response) => {
  const body = request.body
  const id = request.params.id
  const itemId = request.params.itemId
  const list = lists.find(list => list.id === id)

  const item = {
    name: body.name,
    quantity: body.quantity,
    checked: body.checked,
    id: itemId
  }

  list.items = list.items.map(i => i.id === itemId ? item : i)
  lists = lists.map(l => l.id === id ? list : l)

  response.json(item);
})

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.get('/api/users/:id', (request, response) => {
  const id = Number(request.params.id)
  const user = users.find(user => user.id === id)
  if(user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

app.post('/api/users', (request, response) => {  
  console.log('creating a user')
  const user = request.body
  console.log(user)  
  users = users.concat(user)
  response.json(user)
})

app.delete('/api/users/:id', (request, response) => {
  const id = request.params.id
  users = users.filter(user => user.id !== id)

  response.status(204).end()
})


app.use(middleware.unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})