/**
 * @module Memento.ts
 * @description Memento Pattern - Memento Class - saves state
 */

class Memento {
  constructor(
    private state: string[],
  ) { }

  public getState() {
    return this.state;
  }
}

export default Memento;
