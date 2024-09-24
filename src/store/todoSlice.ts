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

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
    addTodo(state, action: PayloadAction<ITodo>) {
      state.todos.push(action.payload);
    },
    completeTodo(state, action: PayloadAction<string>) {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { setUser, addTodo, completeTodo, deleteTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
