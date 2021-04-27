const itemsRouter = require('express').Router()
const List = require("../models/list");
const Item = require("../models/item");
const logger = require("../utils/logger")

itemsRouter.get('/:id/items', async (request, response) => {
  const id = request.params.id
  const list = await List.findOne({listId: id})
  if(list) {
    response.json(list.items);
  } else {
    response.status(404).end()
  }
})
  
itemsRouter.post('/:id/items', async (request, response) => {
  const id = request.params.id
  const list = await List.findOne({listId: id})

  const item = new Item({
    ...request.body
  })
  list.items = list.items.concat(item)

  const updatedList = await list.save()
  response.json(updatedList)
})
  
itemsRouter.delete('/:id/items/:itemId', async (request, response) => {
  try {
    const id = request.params.id
    const list = await List.findOne({listId: id})
    const itemId = request.params.itemId
    list.items = list.items.filter(i => i.id !== itemId)
    await list.save()
  
    response.status(204).end()
  } catch (error) {
    logger.error(error)
  }
})

itemsRouter.delete('/:id/manyItems', async (request, response) => {
  const id = request.params.id
  const list = await List.findOne({listId: id})
  list.items = list.items.filter(i => !i.checked)
  await list.save()
  
  response.status(204).end()
})
  
itemsRouter.delete('/:id/items', async (request, response) => {
  const id = request.params.id
  const list = await List.findOne({listId: id})
  list.items = []
  await list.save()
  
  response.status(204).end()
})
  
itemsRouter.put('/:id/items/:itemId', async (request, response) => {
  try {
    const body = request.body
    const id = request.params.id
    const itemId = request.params.itemId
    const list = await List.findOne({listId: id})
  
    const item = {
      name: body.name,
      quantity: body.quantity,
      checked: body.checked
    }
  
    list.items = list.items.map(i => i.id === itemId ? item : i)
    const updatedList = await list.save()
    response.json(updatedList);
  } catch(error) {
    logger.error(error)
  }
})

module.exports = itemsRouter;