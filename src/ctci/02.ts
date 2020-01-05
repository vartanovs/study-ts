import SLL from '../ds/SLL';
import SLLNode from '../ds/SLLNode';
import Stack from '../ds/Stack';

/**
 * 2.1 - Remove Duplicates
 * Remove Duplicate Nodes from a Linked List
 * Time Complexity: O(N), Space Complexity O(N)
 */
export const removeDuplicateNodes = (linkedList: SLL) => {
  // Edge Case - Empty or Single Item List
  if (!linkedList.head || !linkedList.head.next) return linkedList;

  // Use tracker to traverse list and a buffer to retain values
  interface ValueBuffer { [value: string]: boolean }
  const buffer: ValueBuffer = {};
  let currNode: SLLNode = linkedList.head;

  buffer[linkedList.head.value] = true;
  while (currNode.next) {
    if (currNode.next.value in buffer) {
      currNode.next = currNode.next.next;
      if (!currNode.next) {
        linkedList.tail = currNode;
      }
    } else {
      buffer[currNode.next.value] = true;
      currNode = currNode.next;
    }
  }

  return linkedList;
};

/**
 * 2.2 - Return Kth To Last
 * Return the value at the kth to the last node in a Singly Linked List
 * Time Complexity: O(N), Space Complexity O(1)
 */
export const findKthToLast = (linkedList: SLL, k: number) => {
  // Edge Case - Empty List
  if (!linkedList.tail || !linkedList.head) return null;
  // Edge Case - K is 0;
  if (!k) return linkedList.tail.value;

  // Strategy: Determine list length to identify target kthToLast node
  let length = 0;
  let tracker = linkedList.head;
  while (tracker.next) {
    length += 1;
    tracker = tracker.next;
  }

  // Edge Case - K greater than length
  if (k > length) return null;

  let distToKthNode = length - k;
  let currNode = linkedList.head;
  while (distToKthNode && currNode.next) {
    distToKthNode -= 1;
    currNode = currNode.next;
  }

  return currNode.value;

  // // Strategy: Generate a shuttle of length k and send shuttle to end of list
  // let kFromStart = linkedList.head;
  // for (let n = 0; n < k; n += 1) {
  //   if (!kFromStart.next) return null;
  //   kFromStart = kFromStart.next;
  // }
  //
  // let currNode = linkedList.head;
  // while (kFromStart.next && currNode.next) {
  //   currNode = currNode.next;
  //   kFromStart = kFromStart.next;
  // }
  //
  // return currNode.value;
};

/**
 * 2.3 - Delete SLL Node
 * Given a pointer to a node in a linked list, remove and return that node
 * Time Complexity: O(1), Space Complexity O(1)
 */
export const deleteMiddleNode = (node: SLLNode) => {
  if (node.next) {
    node.value = node.next.value;
    node.next = node.next.next;
    return true;
  }

  return null;
};

/**
 * 2.4 - Reorder Linked List
 * Given a linked list and num, revise the list such that:
 * All numbers less than num come before all number equal to or greater than num
 * Time Complexity: O(N), Space Complexity O(1)
 */
export const reorderList = (linkedList: SLL<number>, num: number) => {
  // Edge case - no list or list of length 1
  if (!linkedList.head || !linkedList.tail || linkedList.head === linkedList.tail) return linkedList;

  // Declare a second list to hold values >= number
  const secondList = new SLL<number>();
  // Iterate through list until we find a node whose value is < num
  while (linkedList.head && linkedList.head.value >= num) {
    // Starting from the head, nodes whose val > num are added to the secondList
    secondList.add(linkedList.head.value);
    if (linkedList.head && linkedList.head.next) {
      linkedList.head = linkedList.head.next;
    } else {
      // Edge Case - If all nodes have value greater than num, just return the newly created list
      linkedList.head  = secondList.head;
      linkedList.tail = secondList.tail;
      return linkedList;
    }
  }

  // Set tracker for the first node and begin iterating thru LinkedList
  let currNode = linkedList.head;
  while (currNode && currNode.next) {
    if (currNode.next.value >= num) {
      // If the node following the tracker is >= num, move it to secondList
      secondList.add(currNode.next.value);
      currNode.next = currNode.next.next;
    } else {
      // If the node following the tracker is < num, move tracker one forward
      currNode = currNode.next;
    }
  }

  // Check if secondList has been populated - if so, append to linkedList
  if (currNode && secondList.head) {
    currNode.next = secondList.head;
    linkedList.tail = secondList.tail;
  }

  return linkedList;
};

/**
 * 2.5 - Sum Lists
 * Two numbers are represented by linked lists in reverse order
 * Such that the ones place is at the head, pointing to tens place, etc
 * Return a list that represents the two values summed. Do this in place.
 * Time Complexity: O(N), Space Complexity O(1)
 */
export const sumLists = (list1: SLL<number>, list2: SLL<number>) => {
  // Edge Case - One of the numbers is blank, return the other list
  if (!list2.head || !list2.tail) return list1;
  if (!list1.head || !list1.tail) return list2;

  // Declare pointers that point at the ones place of each number
  let currentNode1: SLLNode<number> | null = list1.head;
  let currentNode2: SLLNode<number> | null = list2.head;
  // Declare a placeholder to indicate whether a number is being carried
  let carry = 0;
  // Sum the portion of the two numbers that overlaps, keeping track of carry
  while (currentNode1 && currentNode2) {
    const sum = currentNode1.value + currentNode2.value + carry;
    carry = sum >= 10 ? 1 : 0;
    currentNode1.value = sum % 10;
    currentNode1 = currentNode1.next;
    currentNode2 = currentNode2.next;
  }

  // If second number is longer than first, move all remaining nodes to list1
  if (currentNode2) {
    list1.tail.next = currentNode2;
    list1.tail = list2.tail;
    currentNode1 = currentNode2;
  }

  // Continue traversing using currentNode1 as long as there is a carry
  while (currentNode1 && carry) {
    if (currentNode1.value === 9) {
      currentNode1.value = 0;
      currentNode1 = currentNode1.next;
    } else {
      currentNode1.value += carry;
      carry = 0;
    }
  }

  // If there is still a carry, add a node with a 1 on the end
  if (carry) {
    list1.add(1);
  }

  return list1;
};

/**
 * 2.6 - Palindrome
 * Determine if a linked list is a palindrome
 * Time Complexity: O(N), Space Complexity O(N)
 */
export const isPalindrome = (linkedList: SLL) => {
  // Edge Cases - Short list (length 0, 1, 2)
  if (!linkedList.head || !linkedList.tail) return false;
  if (linkedList.head === linkedList.tail) return true;
  if (linkedList.head.next === linkedList.tail) {
    return linkedList.head.value === linkedList.tail.value;
  }

  // Declare two runners - a fast runner and a slow runner
  let turtle: SLLNode | null = linkedList.head;
  let hare: SLLNode | null = linkedList.head;

  // Also declare a stack to push in the values in the first half of the list
  const turtleStack = new Stack();
  while (turtle && hare && hare.next) {
    turtleStack.push(turtle.value);
    turtle = turtle.next;
    hare = hare.next.next;
  }
  // If hare landed on the tail, there is an odd number of nodes, move turtle forward 1
  if (hare === linkedList.tail && turtle) {
    turtle = turtle.next;
  }

  // Compare turtle's value to top of the stack until turtle hits the end and/or stack empties
  while (turtle && turtleStack.height) {
    if (turtle.value !== turtleStack.pop()) return false;
    turtle = turtle.next;
  }

  return true;
};

/**
 * 2.7 - Intersection
 * Given two singly linked lists, determine if they intersect
 * If they intersect, return the intersecting node
 * Time Complexity: O(M + N), Space Complexity O(1)
 */
export const findIntersection = (LL1: SLL, LL2: SLL) => {
  // Edge Case - One List Does Not Exist or tails are different
  if (!LL1.head || !LL1.tail || !LL2.head || !LL2.tail) return false;
  if (LL1.tail !== LL2.tail) return false;

  // Determine length of both lists using counters and pointers
  let len1 = 0;
  let len2 = 0;
  let currentNode1: SLLNode | null = LL1.head;
  let currentNode2: SLLNode | null = LL2.head;
  while (currentNode1) {
    len1 += 1;
    currentNode1 = currentNode1.next;
  }

  while (currentNode2) {
    len2 += 1;
    currentNode2 = currentNode2.next;
  }

  // Chop off the front of both lists until they have the same length
  while (len1 > len2 && LL1.head && LL2.head) {
    LL1.head = LL1.head.next;
    len1 -= 1;
  }

  while (len2 > len1 && LL1.head && LL2.head) {
    LL2.head = LL2.head.next;
    len2 -= 1;
  }

  // Starting at the head, traverse both linked lists until intersection is found
  currentNode1 = LL1.head;
  currentNode2 = LL2.head;
  while (currentNode1 && currentNode2 && currentNode1 !== currentNode2) {
    currentNode1 = currentNode1.next;
    currentNode2 = currentNode2.next;
  }

  // Return intersection
  return currentNode1!;
};

/**
 * 2.8 - Loop Detection
 * Given a circular Singularly Linked List
 * Return the node where the loop begins
 * Time Complexity: O(N), Space Complexity O(1)
 */
export const findLoopStart = (linkedList: SLL): SLLNode | null => {
  // Edge Case - Empty list
  if (!linkedList.head) return null;

  // Set trackers at the head
  let turtle = linkedList.head;
  let hare = linkedList.head;
  // Find node at which trackers meet
  while (turtle.next && hare.next && hare.next.next) {
    turtle = turtle.next;
    hare = hare.next.next;
    if (turtle === hare) break;
  }

  // Declare a new tracker at the start of the list
  let turtle2 = linkedList.head;
  while (turtle !== turtle2 && turtle.next && turtle2.next) {
    // Move both trackers forward - where they meet is where the loop starts
    turtle = turtle.next;
    turtle2 = turtle2.next;
  }

  return turtle;
};
