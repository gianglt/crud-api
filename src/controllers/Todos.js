const Todo = require("../models/Todos");

const createTodo = async (req, res) => {
  console.log('BODY', req.body);
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  });
  console.log('TODO', todo);
  await todo.save()
    .then((todo) => {
      res.json(todo);
    })
    .catch(err => {
      res.send(err)
    });
}

const getAllTodos = async (req, res) => {
  await Todo.find()
  .then((todo) => {
    res.json(todo);
  })
  .catch(err => {
    res.send(err)
  });

};

const getTodos = async (req, res) => {
  const filter = {title : {$regex : req.body.title}};
  await Todo.find(filter)
  .then((todo) => {
    res.json(todo);
  })
  .catch(err => {
    res.send(err)
  });

};

const getTodo = async (req, res) => {
  await Todo.findOne({ title: req.body.title })
  .then((todo) => {
    res.json(todo);
  })
  .catch(err => {
    res.send(err)
  });

};


const updateTodo = async (req, res) => {
  const filter = {_id : req.body._id};
  const update = req.body;

  let options = {
    new: true
  };

  let doc = await Todo.findOneAndUpdate(filter, update, options)
  .catch(err => {res.send(err)});
 
  console.log("DOC", doc)
  res.json(doc);
};

const updateTodoByField = async (req, res) => {
  const filter = {_id : req.body._id};
  const newValues = {$set: {title:req.body.title}};
  const options = { upsert: false };

  let doc = await Todo.findOne(filter);
  console.log("DOC", doc)


  let result = await Todo.updateOne(filter,newValues, options)
  .catch(err => {res.send(err)});
 
  console.log("RESULT", result)
  res.json(result);
};


const deleteTodo = async (req, res) => {
  const filter = {_id : req.body._id};

  const result = await Todo.deleteOne(filter)  
  .catch(err => {res.send(err)})
 
  res.json(result);
};




module.exports = {
  getAllTodos,
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  updateTodoByField,
  deleteTodo
};