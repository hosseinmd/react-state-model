[![NPM](https://nodei.co/npm/react-state-model.png)](https://nodei.co/npm/react-state-model/)

[![install size](https://packagephobia.now.sh/badge?p=react-state-model)](https://packagephobia.now.sh/result?p=react-state-model) [![dependencies](https://david-dm.org/hosseinmd/react-state-model.svg)](https://david-dm.org/hosseinmd/react-state-model.svg)

# react-state-model

Easy state management with models for react & react-native using hooks.
It's useful for global state management and complex components local state

## TOC

- [Install](#Install)
- [Model](#Model)
- [Class Components](#Class)
- [Create Local Store ](#useLocalStore)

## Install

```npm
npm i react-state-model --save
```

```npm
yarn add react-state-model
```

## Model

```javascript
import { model, createHooks } from "react-state-model";

const initialState = {
  counter: 0,
};

const getActions = (setState, self) => ({
  increase() {
    setState({ count: self.count + 1 });
  },
  decrease() {
    if (self.count <= 0) return;

    setState({ count: self.count - 1 });
  },
});

const Store = model(initialState, actions).create();
const useGlobal = createHooks(Store);

const App = () => {
  return (
    <div>
      <button type="button" onClick={Store.decrease}>
        Decrease
      </button>
      <button type="button" onClick={Store.increase}>
        Increase
      </button>
      <OtherComp />
    </div>
  );
};

const OtherComp = () => {
  const store = useGlobal(["counter"]);
  return <p>Count:{store.counter}</p>;
};
```

## Class

if you want to use store in class component follow this approach

```javascript
class TestComponent extends Component {
  componentDidMount() {
    this.unsubscribe = addListener(Store, () => this.forceUpdate());
  }
  componentWillUnmount() {
    this.unsubscribe.remove();
  }
  render() {
    return (
      <p onMouseEnter={Store.increase} onMouseLeave={Store.decrease}>
        {Store.count}
      </p>
    );
  }
}
```

## useLocalStore

Use this instead of useReducer

```javascript
import { useLocalStore } from "react-state-model";

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

const App = () => {
  const store = useLocalModel(Store);

  return (
    <div>
      <p>
        Count:
        {store.counter}
      </p>
      <button type="button" onClick={store.increase}>
        Increase
      </button>
    </div>
  );
};
```

---
