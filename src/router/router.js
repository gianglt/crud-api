const router = require("express").Router();

const { getTodos, getAllTodos,  createTodo, getTodo, updateTodo, deleteTodo, updateTodoByField } = require("../controllers/Todos");

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

router.get("/todos", getAllTodos);
router.post("/todos/search", getTodos);
router.post("/todos", createTodo);
router.post("/todos/get", getTodo);
router.post("/todos/update", updateTodo);
router.post("/todos/updateByField", updateTodoByField);
router.post("/todos/delete", deleteTodo);


module.exports = router;