const itemsRouter = require('express').Router()

itemsRouter.get('/api/lists/:id/items', (request, response) => {
  const id = request.params.id
  const list = lists.find(list => list.id === id)
  if(list) {
    response.json(list.items)
  } else {
    response.status(404).end()
  }
})
  
itemsRouter.post('/api/lists/:id/items', (request, response) => {
  const id = request.params.id
  const list = lists.find(list => list.id === id)
  const item = request.body
  list.items = list.items.concat(item)
  
  lists = lists.map(l => l.id === id ? list : l)
  response.json(lists)
})
  
itemsRouter.delete('/api/lists/:id/items/:itemId', (request, response) => {
  const id = request.params.id
  const list = lists.find(list => list.id === id)
  const itemId = request.params.itemId
  list.items = list.items.filter(l => l.id !== itemId)
  lists = lists.map(l => l.id === id ? list : l)
  
  response.status(204).end()
})
  
itemsRouter.delete('/api/lists/:id/items', (request, response) => {
  const id = request.params.id
  const list = lists.find(list => list.id === id)
  list.items = []
  lists = lists.map(l => l.id === id ? list : l)
  
  response.status(204).end()
})
  
itemsRouter.put('/api/lists/:id/items/:itemId', (request, response) => {
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