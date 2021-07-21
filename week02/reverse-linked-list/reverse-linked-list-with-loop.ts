import LinkedListNode from "./LinkedListNode";

function reverseLinkedList(
  linkedList: LinkedListNode | null
): LinkedListNode | null {
  let prev: LinkedListNode | null = null;
  let current: LinkedListNode | null = linkedList;

  while (current != null) {
    [current.next, prev, current] = [prev, current, current.next];
  }

  return prev;
}

export default reverseLinkedList;
