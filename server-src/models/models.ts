import { Record } from "./records";
import { User } from "./users";
import { Auth } from "./auth";

// Set Auth and User models associations
User.hasOne(Auth);
Auth.belongsTo(User);

// Set Record and User models associations
User.hasMany(Record);
Record.belongsTo(User);

export { User, Auth, Record };
