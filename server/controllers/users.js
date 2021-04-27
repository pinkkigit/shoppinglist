const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post('/', async (request, response) => {
  const body = request.body;
  
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
    .find({})
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.get('/:id', async (request, response) => {
  const id = Number(request.params.id)
  const user = await User.find(user => user.id === id)
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
  
module.exports = usersRouter;
  