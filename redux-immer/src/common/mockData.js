const friends = [
  { name: "A", age: 30 },
  { name: "B", age: 25 },
  { name: "C", age: 34 },
];

const timelines = [
  { desc: "점심이 맛있었다", likes: 0 },
  { desc: "나는 멋지다", likes: 10 },
  { desc: "호텔에 놀러갔다", likes: 20 },
];

function makeDataGenerator(items) {
  let itemIndex = 0;
  return function getNextData() {
    const item = items[itemIndex % items.length];
    itemIndex += 1;
    return { ...item, id: itemIndex };
  };
}

export const getNextFriend = makeDataGenerator(friends);
export const getNextTimeline = makeDataGenerator(timelines);
