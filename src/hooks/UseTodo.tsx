import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Todo from "../types/Todo";

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string, description: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string, description: string) => void;
  deleteAllTodo: () => void;
  updateActiveTodo: (id: number) => void;
  sortOption: string;
  setSortOption: (sortOption: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

type TodoProviderProps = {
  children: ReactNode;
};

const getFromLocalStorage = (item: string) => {
  if (typeof window !== "undefined") {
    let result = localStorage.getItem(item);
    if (result) {
      let parsedResult = JSON.parse(result);
      if (Array.isArray(parsedResult)) {
        return result;
      }
    }
    return "[]";
  }
};
const setToLocalStorage = (item: string, value: Todo[]) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(item, JSON.stringify(value));
  }
};

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  let initTodos: Todo[] = JSON.parse(getFromLocalStorage("todos") || "[]").map(
    (todo: any) => {
      return {
        ...todo,
        createDate: new Date(todo.createDate),
        updateDate: new Date(todo.updateDate),
      };
    }
  );

  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [sortOption, setSortOption] = useState<string>("newest");

  const setAllTodos = (todos: Todo[]) => {
    let sortedTodos: Todo[] = [];

    const SortOptionMap: Record<
      string,
      { sign: 1 | -1; propName: "createDate" | "updateDate" }
    > = { newest: { sign: 1, propName: "createDate" } };

    const { sign, propName } = SortOptionMap[sortOption];
    sortedTodos = todos
      .slice()
      .sort((a, b) => sign * (b[propName].getTime() - a[propName].getTime()));
    setTodos(sortedTodos);
  };

  useEffect(() => {
    const storedTodos = getFromLocalStorage("todos");
    if (storedTodos) {
      let todos = JSON.parse(storedTodos);
      todos.forEach((todo: Todo) => {
        todo.createDate = new Date(todo.createDate);
        todo.updateDate = new Date(todo.updateDate);
      });
      setAllTodos(todos);
    }
  }, []);

  useEffect(() => {
    setToLocalStorage("todos", todos);
  }, [todos]);

  const addTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      description,
      createDate: new Date(),
      updateDate: new Date(),
      isActive: true,
    };
    setAllTodos([...todos, newTodo]);
  };

  const deleteAllTodo = () => {
    setAllTodos([]);
    localStorage.removeItem("todos");
  };
  const deleteTodo = (id: number) => {
    setAllTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, title: string, description: string) => {
    console.log("1");
    const updatedTodos = todos.map((todo) => {
      console.log("2");
      if (todo.id === id) {
        console.log("3");
        return {
          ...todo,
          title: title,
          description: description,
          updateDate: new Date(),
        };
      }
      return todo;
    });
    console.log("4");
    setAllTodos(updatedTodos);
    console.log(updatedTodos);
  };
  const updateActiveTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isActive: !todo.isActive };
      }
      return todo;
    });
    setAllTodos(updatedTodos);
  };

  useEffect(() => {}, [sortOption]);

  const todoContextValue: TodoContextType = {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    deleteAllTodo,
    updateActiveTodo,
    sortOption,
    setSortOption,
  };

  return (
    <TodoContext.Provider value={todoContextValue}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Todo Context Error");
  }
  return context;
};

export default TodoProvider;
