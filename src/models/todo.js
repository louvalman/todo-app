export const createTodo = (
  title,
  description,
  dueDate,
  priority,
  notes,
  checklist = [],
  existingId = null,
) => {
  // create a unique id for each todo
  const id =
    existingId || `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  // default status is incomplete
  let isComplete = false;

  // private mutable fields
  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _notes = notes;

  // getters
  const getTitle = () => _title;
  const getDescription = () => _description;
  const getDueDate = () => _dueDate;
  const getPriority = () => _priority;
  const getNotes = () => _notes;

  // update all fields at once
  const update = (todoData) => {
    _title = todoData.title ?? _title;
    _description = todoData.description ?? _description;
    _dueDate = todoData.dueDate ?? _dueDate;
    _priority = todoData.priority ?? _priority;
    _notes = todoData.notes ?? _notes;
  };

  // toggle complete status
  const toggleComplete = () => {
    isComplete = !isComplete;
  };

  const getStatus = () => isComplete;

  return {
    id,
    checklist,
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getNotes,
    update,
    toggleComplete,
    getStatus,
  };
};
