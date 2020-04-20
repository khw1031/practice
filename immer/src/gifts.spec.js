import { addGift, toggleReservation, addBook, getBookDetails } from "./gifts";

const initialState = {
  users: [
    {
      id: 1,
      name: "Test user",
    },
    {
      id: 2,
      name: "Someone else",
    },
  ],
  currentUser: {
    id: 1,
    name: "Test user",
  },
  gifts: [
    {
      id: "immer_license",
      description: "Immer license",
      image:
        "https://raw.githubusercontent.com/immerjs/immer/master/images/immer-logo.png",
      reservedBy: 2,
    },
    {
      id: "egghead_subscription",
      description: "Egghead.io subscription",
      image:
        "https://pbs.twimg.com/profile_images/735242324293210112/H8YfgQHP_400x400.jpg",
      reservedBy: undefined,
    },
  ],
};

describe("Reserving an unreserved gift", () => {
  const nextState = addGift(initialState, "mug", "Coffee mug", "");

  it("added a gift to the collection", () => {
    expect(nextState.gifts.length).toBe(3);
  });

  it("didn't modify the original state", () => {
    expect(initialState.gifts.length).toBe(2);
  });
});

describe("Reserving an unreserved gift", () => {
  const nextState = toggleReservation(initialState, "egghead_subscription");

  it("correctly stores reservedBy", () => {
    expect(nextState.gifts[1].reservedBy).toBe(1);
  });

  it("didn't modify the original state", () => {
    expect(initialState.gifts[1].reservedBy).toBe(undefined);
  });

  it("does structurally share unchanged parts of the state tree", () => {
    expect(nextState).not.toBe(initialState);
    expect(nextState.gifts[1]).not.toBe(initialState.gifts[1]);
    expect(nextState.gifts[0]).toBe(initialState.gifts[0]);
  });

  it("can't accidentally modify the produced state", () => {
    expect(() => {
      nextState.gifts[1].reservedBy = undefined;
    }).toThrow();
  });
});

describe("Reserving an already reserved gift", () => {
  const nextState = toggleReservation(initialState, "immer_license");

  it("preserves stored reservedBy", () => {
    expect(nextState.gifts[0].reservedBy).toBe(2);
  });

  it("no new gift should be created", () => {
    expect(nextState.gifts[0]).toEqual(initialState.gifts[0]);
    expect(nextState.gifts[0]).toBe(initialState.gifts[0]);
    expect(nextState).toBe(initialState);
  });
});

describe("Can add book async", () => {
  it("Can add math book", async () => {
    const book = await getBookDetails("0201558025");
    const nextState = addBook(initialState, book);
    expect(nextState.gifts[2].description).toBe("Concrete mathematics");
  });
});
