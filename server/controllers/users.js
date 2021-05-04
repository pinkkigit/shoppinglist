const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const logger = require("../utils/logger")

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  if (body.username === undefined || body.username.length < 3) {
    return response.status(400)
      .json( {message: 'username is too short'});
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});
  
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate("lists")
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const user = await User.findById(id).populate("lists")
  if(user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await User.filter(user => user.id !== id)
  
  response.status(204).end()
})

usersRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body
    const id = request.params.id
    const user = await User.findByIdAndUpdate(id, body)
  
    response.json(user);

  } catch(error) {
    logger.error(error)
  }
})
  
module.exports = usersRouter;
  