import renderer from "react-test-renderer";
import React, { Component } from "react";
import { model, addListener } from "../src";

const Counter = model({ count: 0 }, (setState, self) => ({
  increase() {
    setState({ count: self.count + 1 });
  },
  decrease() {
    if (self.count <= 0) return;

    setState({ count: self.count - 1 });
  },
}));

const counter = Counter.create();

class TestComponent extends Component {
  componentDidMount() {
    this.unsubscribe = addListener(counter, () => this.forceUpdate());
  }
  componentWillUnmount() {
    this.unsubscribe.remove();
  }
  render() {
    return (
      <p onMouseEnter={counter.increase} onMouseLeave={counter.decrease}>
        {counter.count}
      </p>
    );
  }
}

test("TestComponent changes the count when hovered", () => {
  const component = renderer.create(<TestComponent></TestComponent>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
