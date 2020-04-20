import produce, { original } from "immer";

// produce(state, recipe) => nextState
// produce(recipe) => state => nextState
export const addGift = produce((draft, id, description, image) => {
  draft.gitfs.push({
    id,
    description,
    image,
    reservedBy: undefined,
  });
});

export const toggleReservation = produce((draft, giftId) => {
  const gift = draft.gifts.find(gift => gift.id === giftId);
  gift.reservedBy =
    gift.reservedBy === undefined
      ? draft.currentUser.id
      : gift.reservedBy === original(draft.currentUser).id
      ? undefined
      : gift.reservedBy;
});
