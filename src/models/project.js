export const createProject = (name, existingId = null) => {
  const id =
    existingId || `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  // a private array that'll only be accessible via the method below
  let todos = [];

  const getName = () => name;

  // return a copy of the list of todos
  const getTodos = () => [...todos];

  // add a todo object to the todos array
  const addTodo = (todo) => {
    todos.push(todo);
  };

  // find a todo and remove it using its id
  const removeTodo = (todoId) => {
    todos = todos.filter((t) => t.id !== todoId);
  };

  return {
    id,
    getName,
    addTodo,
    getTodos,
    removeTodo,
  };
};
