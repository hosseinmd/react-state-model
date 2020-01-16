import { renderHook, act } from "@testing-library/react-hooks";
import { useCallback } from "react";
import { model } from "../src";
import { useLocalModel } from "../src";

const Store = model(
  {
    count: 0,
  },
  (setState, self) => ({
    increase() {
      setState({ count: self.count + 1 });
    },
  }),
);

function TestComponent() {
  const store = useLocalModel(Store);

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
