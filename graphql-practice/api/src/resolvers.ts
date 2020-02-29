import { Date } from "./type-def";

const resolvers = {
  Query: {
    pets: (_, { input }, ctx, _info) => ctx.models.Pet.findMany(input),
    pet: (_, { id }, ctx) => ctx.models.Pet.findOne({ id }),
  },
  Mutation: {
    addUser: (_, { input }, ctx) => ctx.models.User.create(input),
    addPet: (_, { input }, ctx) => ctx.models.Pet.create(input),
  },
  Pet: {
    img: pet => {
      console.log(pet);
      return pet.type === "DOG"
        ? "https://placedog.net/300/300"
        : "http://placekitten.com/300/300";
    },
  },
  // User: {},
  Date,
};

export default resolvers;
