const listsRouter = require('express').Router()
const List = require("../models/list");

listsRouter.get('/', async (request, response) => {
  const lists = await List.find({})
  response.json(lists.map((u) => u.toJSON()));
})

listsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const list = await List.find(list => list.id === id)
  if(list) {
    response.json(list)
  } else {
    response.status(404).end()
  }
})

listsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await List.filter(list => list.id !== id)

  response.status(204).end()
})

listsRouter.post('/', async (request, response) => {
  const list = new List({
    ...request.body
  })
  const newList = await list.save()
  response.json(newList)
})

module.exports = listsRouter;