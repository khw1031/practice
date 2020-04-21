import produce, { original } from "immer";
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
// structural sharing
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

// export function getInitialState() {
//   return {
//     users: allUsers,
//     currentUser: getCurrentUser(),
//     gifts: defaultGifts,
//   };
// }

// step 4 - remove duplication
// produce(state, recipe) => nextState
// produce(recipe) => state => nextState // currying
export const addGift = produce((draft, id, description, image) => {
  // collection에 무엇인가를 추가한다는 것을 그대로 작성.
  draft.gifts.push({
    id,
    description,
    image,
    reservedBy: undefined
  });
});

export const toggleReservation = produce((draft, giftId) => {
  const gift = draft.gifts.find(gift => gift.id === giftId);
  gift.reservedBy =
    gift.reservedBy === undefined
      ? original(draft.currentUser).id
      : gift.reservedBy === original(draft.currentUser).id
      ? undefined
      : gift.reservedBy;
});

export function getInitialState() {
  return {
    users: allUsers,
    currentUser: getCurrentUser(),
    gifts: defaultGifts
  };
}

// async function
export async function getBookDetails(isbn) {
  const response = await fetch(
    `http://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`,
    {
      mode: "cors"
    }
  );
  const book = (await response.json())["ISBN:" + isbn];
  return book;
}

export const addBook = produce((draft, book) => {
  draft.gifts.push({
    id: book.isbn,
    description: book.title,
    image: book.cover.medium,
    reservedBy: undefined
  });
});

// step5 - reducer
export const giftReducer = produce((draft, action) => {
  switch (action.type) {
    case "ADD_GIFT": {
      const { id, description, image } = action;
      draft.gifts.push({
        id,
        description,
        image,
        reservedBy: undefined
      });
      break;
    }
    case "TOGGLE_RESERVATION": {
      const { id } = action;
      const gift = draft.gifts.find(gift => gift.id === id);
      if (!gift) return;
      gift.reservedBy =
        gift.reservedBy === undefined
          ? original(draft.currentUser).id
          : gift.reservedBy === original(draft.currentUser).id
          ? undefined
          : gift.reservedBy;
      break;
    }
    case "ADD_BOOK": {
      const { book } = action;
      draft.gifts.push({
        id: book.isbn,
        description: book.title,
        image: book.cover.medium,
        reservedBy: undefined
      });
      break;
    }
    case "RESET": {
      return getInitialState();
    }
  }
});
