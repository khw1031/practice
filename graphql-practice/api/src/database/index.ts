import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("./src/database/db.json");
const db = low(adapter);

import createPetModel from "./model/pet";
import createUserModel from "./model/user";

const models = {
  Pet: createPetModel(db),
  User: createUserModel(db),
};

export { models, db };
