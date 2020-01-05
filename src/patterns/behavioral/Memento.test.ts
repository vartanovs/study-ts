import Memento from './Memento';
import Originator from './Originator';
import Caretaker from './Caretaker';

const firstValue = 'a';
const secondValue = 'b';
const thirdValue = 'c';
const mockState = [firstValue, secondValue, thirdValue];

describe('src/patterns/behavioral/Memento', () => {
  describe('.getState()', () => {
    it('should return the state it was instantiated with', () => {
      const testMemento = new Memento([...mockState]);
      expect(testMemento.getState()).toEqual(mockState);
    });
  });
});

describe('src/patterns/behavioral/Originator', () => {
  describe('.getState()', () => {
    it('should return empty state if initialized without state', () => {
      const testOriginator = new Originator();
      expect(testOriginator.getState()).toEqual([]);
    });

    it('should return whatever state Originator is instantiated with', () => {
      const testOriginator = new Originator([...mockState]);
      expect(testOriginator.getState()).toEqual(mockState);
    });
  });

  describe('.addToState()', () => {
    it('should add a string to the end of the state', () => {
      const testOriginator = new Originator();
      testOriginator.addToState(firstValue);
      testOriginator.addToState(secondValue);
      testOriginator.addToState(thirdValue);
      expect(testOriginator.getState()).toEqual(mockState);
    });

    it('should return the length of state whenever a new string is added', () => {
      const testOriginator = new Originator();
      expect(testOriginator.addToState(firstValue)).toEqual(1);
      expect(testOriginator.addToState(secondValue)).toEqual(2);
      expect(testOriginator.removeFromState(secondValue));
      expect(testOriginator.addToState(thirdValue)).toEqual(2);
    });
  });

  describe('.removeFromState()', () => {
    it('should remove a string from state', () => {
      const testOriginator = new Originator([...mockState]);
      testOriginator.removeFromState(firstValue);
      testOriginator.removeFromState(thirdValue);
      expect(testOriginator.getState()).toEqual([secondValue]);
    });

    it('should return a booelan indicating whether or not the string was found and removed', () => {
      const testOriginator = new Originator();
      testOriginator.addToState(firstValue);
      expect(testOriginator.removeFromState(firstValue)).toBeTruthy();
      expect(testOriginator.removeFromState(secondValue)).toBeFalsy();
    });
  });

  describe('.save()', () => {
    it('should return a memento with the state that matches Originator state', () => {
      const testOriginator = new Originator([...mockState]);
      expect(testOriginator.save()).toBeInstanceOf(Memento);
      expect(testOriginator.save().getState()).toEqual(mockState);
    });
  });

  describe('.restore()', () => {
    it('should update state to the state of the memento', () => {
      const testMemento = new Memento([...mockState]);
      const testOriginator = new Originator();
      expect(testOriginator.getState()).toEqual([]);
      testOriginator.restore(testMemento);
      expect(testOriginator.getState()).toEqual(mockState);
    });
  });
});

describe('src/patterns/behavioral/Caretaker', () => {
  describe('.addMemento()', () => {
    it('should maintain a record of mementos saved', () => {
      const testCaretaker = new Caretaker();
      const testOriginator = new Originator();
      testOriginator.addToState(firstValue);
      testCaretaker.addMemento(testOriginator.save());
      testOriginator.addToState(secondValue);
      testOriginator.addToState(thirdValue);
      testCaretaker.addMemento(testOriginator.save());
      expect(testCaretaker.getMemento(0)).toBeInstanceOf(Memento);
      expect(testCaretaker.getMemento(0).getState()).toEqual([firstValue]);
      expect(testCaretaker.getMemento(1)).toBeInstanceOf(Memento);
      expect(testCaretaker.getMemento(1).getState()).toEqual(mockState);
    });

    it('should return the index of each memento stored', () => {
      const testCaretaker = new Caretaker();
      const testOriginator = new Originator();
      testOriginator.addToState(firstValue);
      expect(testCaretaker.addMemento(testOriginator.save())).toEqual(0);
      testOriginator.addToState(secondValue);
      expect(testCaretaker.addMemento(testOriginator.save())).toEqual(1);
    });
  });

  describe('.getMemento()', () => {
    it('given an index, should return the memento stored at that index', () => {
      const testCaretaker = new Caretaker();
      const testOriginator = new Originator();
      testOriginator.addToState(firstValue);
      const testMemento1 = testOriginator.save();
      testOriginator.addToState(secondValue);
      const testMemento2 = testOriginator.save();
      testCaretaker.addMemento(testMemento1);
      testCaretaker.addMemento(testMemento2);
      expect(testCaretaker.getMemento(0)).toBeInstanceOf(Memento);
      expect(testCaretaker.getMemento(0)).toEqual(testMemento1);
      expect(testCaretaker.getMemento(1)).toBeInstanceOf(Memento);
      expect(testCaretaker.getMemento(1)).toEqual(testMemento2);
    });

    it('should return undefined if no memento is stored at the requested index', () => {
      const testCaretaker = new Caretaker();
      const testOriginator = new Originator();
      expect(testCaretaker.getMemento(0)).toBeUndefined();
      testOriginator.addToState(firstValue);
      testCaretaker.addMemento(testOriginator.save());
      expect(testCaretaker.getMemento(0)).toBeInstanceOf(Memento);
      expect(testCaretaker.getMemento(1)).toBeUndefined();
    });
  });
});
