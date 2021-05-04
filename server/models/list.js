const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number
  },
  checked: {
    type: Boolean
  }
}, {
  toJSON: {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
    }
  }
})

const listSchema = mongoose.Schema({
  name: {
    type: String,
  },
  items: [itemSchema],
  listId: {
    type: String
  }
})

listSchema.plugin(uniqueValidator)

listSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    //returnedObject.id = returnedObject._id.toString();
    //delete returnedObject._id
    delete returnedObject.__v
  }
})

const List = mongoose.model('List', listSchema)

module.exports = List