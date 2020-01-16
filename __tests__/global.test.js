import { renderHook, act } from "@testing-library/react-hooks";
import { useCallback } from "react";
import { model, createHooks } from "../src";

const Counter = model(
  {
    count: 0,
  },
  (setState, self) => ({
    /** @type {()=>void} */
    increase() {
      setState({ count: self.count + 1 });
    },
  }),
);
const counter = Counter.create();
const useGlobal = createHooks(counter);

function TestComponent() {
  const store = useGlobal(["count"]);

  const increase = useCallback(() => store.increase(), []);

  return { count: store.count, increase };
}

test("should increment counter", () => {
  const { result } = renderHook(() => TestComponent());

  act(() => {
    result.current.increase();
  });

  expect(result.current.count).toBe(1);
});
