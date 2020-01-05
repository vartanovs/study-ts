/**
 * @module Originator.ts
 * @description Memento Pattern - Originator Class - knows how to save its state
 */

import Memento from './Memento';

class Originator {
  constructor(
    private state: string[] = [],
  ) { }

  public addToState(value: string) {
    return this.state.push(value);
  }

  public removeFromState(value: string) {
    const valueIndex = this.state.indexOf(value);
    if (valueIndex === -1) return false;

    this.state.splice(valueIndex, 1);
    return true;
  }

  public getState() {
    return this.state;
  }

  public save() {
    return new Memento([...this.state]);
  }

  public restore(memento: Memento) {
    this.state = memento.getState();
  }
}

export default Originator;
