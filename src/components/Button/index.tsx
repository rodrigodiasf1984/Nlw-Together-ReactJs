/* eslint-disable no-console */
import { useState } from 'react';

export function Button() {
  const [counter, setCounter] = useState<number>(0);

  function increment() {
    setCounter(counter + 1);
    console.log(counter);
  }

  return (
    <button type="button" onClick={increment}>
      {counter}
    </button>
  );
}
