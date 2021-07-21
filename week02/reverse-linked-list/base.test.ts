import reverseLinkedListWithRecursion from "./reverse-linked-list-with-recursion";
import LinkedListNode from "./LinkedListNode";

const linkedList = new LinkedListNode(
  1,
  new LinkedListNode(
    2,
    new LinkedListNode(3, new LinkedListNode(4, new LinkedListNode(5)))
  )
);

function toArray(ll: LinkedListNode | null) {
  const arr = [];

  let next: LinkedListNode | null = ll;
  while (next) {
    arr.push(next.val);
    next = next.next;
  }

  return arr;
}

test("reverse-linked-list-with-recursion", () => {
  expect(toArray(linkedList)).toEqual([1, 2, 3, 4, 5]);

  expect(toArray(reverseLinkedListWithRecursion(null))).toEqual([]);

  expect(toArray(reverseLinkedListWithRecursion(linkedList))).toEqual([
    5, 4, 3, 2, 1,
  ]);
});
