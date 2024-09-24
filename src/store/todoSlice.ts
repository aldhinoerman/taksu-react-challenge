import { ITodo } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  user: string | null;
  todos: ITodo[];
}

const initialState: TodoState = {
  user: null,
  todos: [],
};

const saveTodosToLocalStorage = (user: string, todos: ITodo[]) => {
  localStorage.setItem(`todos_${user}`, JSON.stringify(todos));
};

const loadTodosFromLocalStorage = (user: string): ITodo[] => {
  const storedTodos = localStorage.getItem(`todos_${user}`);
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
      state.todos = loadTodosFromLocalStorage(action.payload);
    },
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
      if (state.user) {
        saveTodosToLocalStorage(state.user, state.todos);
      }
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        if (state.user) {
          saveTodosToLocalStorage(state.user, state.todos);
        }
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      if (state.user) {
        saveTodosToLocalStorage(state.user, state.todos);
      }
    },
  },
});

export const { setUser, addTodo, completeTodo, deleteTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
