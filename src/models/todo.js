export const createTodo = (
  title,
  description,
  dueDate,
  priority,
  notes,
  checklist = []
) => {
  // create a unique id for each todo
  const id = Date.now().toString();

  // default status is incomplete
  let isComplete = false;

  // methods to interact with the object
  const toggleComplete = () => {
    isComplete = !isComplete;
  };

  const getStatus = () => isComplete;

  // return the object with data + methods
  return {
    id,
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    toggleComplete,
    getStatus,
  };
};
