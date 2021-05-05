const listsRouter = require('express').Router()
const List = require("../models/list");
const logger = require("../utils/logger")
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
    return authorization.substring(7)  
  }  
  return null
}

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
  console.log(id)
  await List.findByIdAndRemove(id)

  response.status(204).end()
})

listsRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
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