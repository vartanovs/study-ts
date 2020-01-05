/**
 * @module Caretaker.ts
 * @description Memento Pattern - Caretaker Class - maintain a record of memento saves
 */

import Memento from './Memento';

class Caretaker {
  constructor(
    private mementos: Memento[] = [],
  ) { }

  public addMemento(memento: Memento) {
    return this.mementos.push(memento) - 1;
  }

  public getMemento(index: number) {
    return this.mementos[index];
  }
}

export default Caretaker;
