import { produceWithPatches, enablePatches, applyPatches } from "immer";

enablePatches();

// Instead of setting up a patch listener,
// an easier way to obtain the patches is to use
// `produceWithPatches`
// which has the same signature as `produce`
// except that it doesn't return just the next state
// but a tuple consisting of
// [nextState, patches, inversePatches]
// Like `produce`, `produceWithPatches` supports currying as well.

let state = {
  age: 33,
};

const [nextState, patches, inversePatches] = produceWithPatches(
  state,
  draft => {
    draft.age++;
  }
);

console.log({ nextState, patches, inversePatches });

const inverseChanges = [...inversePatches];

// 되돌리기
state = applyPatches(nextState, inverseChanges);

console.log(state);

it("test", () => {
  expect(1).toEqual(1);
});
