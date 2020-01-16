import { model, addListener, getSnapshot } from "../src";

const Todo = model(
  {
    title: "",
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

const Store = model({
  /**@type {} */
  todos: [Todo],
});

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

  store.todos[0].toggle();

  expect(getSnapshot(store)).toMatchSnapshot();
});
