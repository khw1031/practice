import produce from "immer";
import { allUsers, getCurrentUser } from "./misc/users";
import defaultGifts from "./misc/gifts.json";

// step 1.
// export function addGift(state, id, description, image) {
//   return {
//     ...state,
//     gifts: [
//       ...state.gifts,
//       {
//         id,
//         description,
//         image,
//         reservedBy: undefined,
//       },
//     ],
//   };
// }

// export function toggleReservation(state, giftId) {
//   return {
//     ...state,
//     gifts: state.gifts.map(gift => {
//       if (gift.id !== giftId) return gift;
//       return {
//         ...gift,
//         reservedBy:
//           gift.reservedBy === undefined
//             ? state.currentUser.id
//             : gift.reservedBy === state.currentUser.id
//             ? undefined
//             : gift.reservedBy,
//       };
//     }),
//   };
// }

// step 2 - immer.
// Simplify Deep State Updates using Immer produce
// export const addGift = produce((draft, id, description, image) => {
//   // collection에 무엇인가를 추가한다는 것을 그대로 작성.
//   draft.gifts.push({
//     id,
//     description,
//     image,
//     reservedBy: undefined,
//   });
// });

// export function toggleReservation(state, giftId) {
//   return produce(state, draft => {
//     const gift = draft.gifts.find(gift => gift.id === giftId);
//     gift.reservedBy =
//       gift.reservedBy === undefined
//         ? state.currentUser.id
//         : gift.reservedBy === state.currentUser.id
//         ? undefined
//         : gift.reservedBy;
//   });
// }

// step 3 - with react
export const addGift = produce((draft, id, description, image) => {
  // collection에 무엇인가를 추가한다는 것을 그대로 작성.
  draft.gifts.push({
    id,
    description,
    image,
    reservedBy: undefined,
  });
});

export function toggleReservation(state, giftId) {
  return produce(state, draft => {
    const gift = draft.gifts.find(gift => gift.id === giftId);
    gift.reservedBy =
      gift.reservedBy === undefined
        ? state.currentUser.id
        : gift.reservedBy === state.currentUser.id
        ? undefined
        : gift.reservedBy;
  });
}

export function getInitialState() {
  return {
    users: allUsers,
    currentUser: getCurrentUser(),
    gifts: defaultGifts,
  };
}
