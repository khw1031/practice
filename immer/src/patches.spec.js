import produce, { applyPatches, enablePatches } from "immer";

enablePatches();

// to help with replaying patches,
// applyPatches comes in handy,

let state = {
  name: "Michael",
  age: 32,
};

// Let's assume the user is in a wizard, and we don't know whether
// his changes should end up in the base state ultimately or not...
let fork = state;
// all the changes the user made in the wizard
let changes = [];
// the inverse of all the changes made in the wizard
let inverseChanges = [];

fork = produce(
  fork,
  draft => {
    draft.age = 33;
  },
  // The third argument to produce is a callback to which the patches will be fed
  (patches, inversePatches) => {
    changes.push(...patches);
    inverseChanges.push(...inversePatches);
  }
);

// In the meantime, our original state is replaced, as, for example,
// some changes were received from the server
state = produce(state, draft => {
  draft.name = "Michel";
});

// // When the wizard finishes (successfully) we can replay the changes that were in the fork onto the *new* state!

state = applyPatches(state, changes);

console.log(state); // { name: 'Michel', age: 33 }

// Finally, even after finishing the wizard, the user might change his mind and undo his changes...
state = applyPatches(state, inverseChanges);
console.log(state); // { name: 'Michel', age: 32 }
it("test", () => {
  expect(state).toEqual({
    name: "Michel", // changed by the server
    age: 32, // changed by the wizard
  });
});
