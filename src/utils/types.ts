type TButton = "primary" | "default" | "error" | "success";
type TButtonSize = "small" | "medium" | "large";

interface ITodo {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

interface ILoginInput {
  username: string;
}

export type { ITodo, TButton, TButtonSize, ILoginInput };
