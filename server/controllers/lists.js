const listsRouter = require('express').Router()
const List = require("../models/list");
const logger = require("../utils/logger")

listsRouter.get('/', async (request, response) => {
  const lists = await List.find({})
  response.json(lists.map((u) => u.toJSON()));
})

listsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const list = await List.findOne({listId: id})
  if(list) {
    response.json(list)
  } else {
    response.status(404).end()
  }
})

listsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await List.filter(list => list.listId !== id)

  response.status(204).end()
})

listsRouter.post('/', async (request, response) => {
  const list = new List({
    ...request.body
  })
  const newList = await list.save()
  response.json(newList)
})

listsRouter.put('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const list = await List.findOneAndUpdate({listId: id}, {name: request.body.name})
  
    response.json(list);

  } catch(error) {
    logger.error(error)
  }
})

module.exports = listsRouter;