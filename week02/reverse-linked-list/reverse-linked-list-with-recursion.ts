import LinkedListNode from "./LinkedListNode";

/**
 * 😁 LeeCode上学来的
 * @param linkedList
 * @returns
 */
function reverseLinkedList(
  linkedList: LinkedListNode | null
): LinkedListNode | null {
  if (linkedList == null || linkedList.next == null) {
    return linkedList;
  }

  const node = reverseLinkedList(linkedList.next);
  linkedList.next.next = linkedList;
  linkedList.next = null;

  return node;
}

export default reverseLinkedList;
