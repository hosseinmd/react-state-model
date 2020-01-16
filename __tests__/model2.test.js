import { model, getSnapshot } from "../src";

const Todo = model(
  {
    title: "",
    assignee: "",
    done: false,
  },
  (setState, self) => ({
    toggle() {
      setState({ done: !self.done });
    },
  }),
)
  .initializer(self => ({}))
  .addListener(snapshot => {
    console.log(snapshot);
  });

const Store = model(
  {
    todos: [Todo],
  },
  (setState, self) => ({
    /**@type {any[]} */
    get completedTodos() {
      return self.todos.filter(t => t.done);
    },
    /**@type {(user: string)=>any[]} */
    findTodosByUser(user) {
      return self.todos.filter(t => t.assignee === user);
    },
    /**@type {(title: string, assignee: string)=>void} */
    addTodo(title, assignee) {
      self.todos.push(
        Todo.create({
          assignee,
          title,
        }),
      );
      setState({
        todos: self.todos,
      });
    },
  }),
);

// create an instance from a snapshot
const store = Store.create({
  todos: [
    Todo.create({
      title: "Get coffee",
    }),
  ],
});

test("store ", () => {
  expect(getSnapshot(store)).toMatchSnapshot();

  store.addTodo("todo 1", "hossein");

  store.addTodo("todo 2", "ali");

  expect(getSnapshot(store)).toMatchSnapshot();

  store.todos[0].toggle();

  expect(getSnapshot(store)).toMatchSnapshot();
});
