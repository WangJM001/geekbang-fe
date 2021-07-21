import reverseLinkedListWithRecursion from "./reverse-linked-list-with-recursion";
import reverseLinkedListWithLoop from "./reverse-linked-list-with-loop";
import LinkedListNode from "./LinkedListNode";

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
  const linkedList = new LinkedListNode(
    1,
    new LinkedListNode(
      2,
      new LinkedListNode(3, new LinkedListNode(4, new LinkedListNode(5)))
    )
  );

  expect(toArray(linkedList)).toEqual([1, 2, 3, 4, 5]);

  expect(toArray(reverseLinkedListWithRecursion(null))).toEqual([]);

  expect(toArray(reverseLinkedListWithRecursion(linkedList))).toEqual([
    5, 4, 3, 2, 1,
  ]);
});

test("reverse-linked-list-with-loop", () => {
  const linkedList = new LinkedListNode(
    1,
    new LinkedListNode(
      2,
      new LinkedListNode(3, new LinkedListNode(4, new LinkedListNode(5)))
    )
  );

  expect(toArray(linkedList)).toEqual([1, 2, 3, 4, 5]);

  expect(toArray(reverseLinkedListWithLoop(null))).toEqual([]);

  expect(toArray(reverseLinkedListWithLoop(linkedList))).toEqual([
    5, 4, 3, 2, 1,
  ]);
});
