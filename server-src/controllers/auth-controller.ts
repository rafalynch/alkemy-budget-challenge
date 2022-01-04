import { User } from "../models/users";
import { Auth } from "../models/auth";
import * as sha1 from "js-sha1";
import * as jwt from "jsonwebtoken";

// Secret key for jwt
const SECRET = process.env.TOKEN_SECRET;

// ---- SIGN UP ----
async function signup(email: string, password: string) {
  // Find or create a new User instance. Save only the email provided.
  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      email,
    },
  });

  // If already exists, return false
  if (!created) {
    return false;
  }

  // Create an Auth instance with the email and password provided
  const newAuth = await Auth.create({
    email,
    password: sha1(password),
    userId: user.get().id,
  });
  return { newAuth };
}

// ---- SING IN ----
async function signin(email: string, password: string) {
  // Check for correct email and password provided
  const auth = await Auth.findOne({
    where: { email, password: sha1(password) },
  });

  if (auth === null) {
    return false;
  } else {
    var token = jwt.sign({ userId: auth.get().userId }, SECRET);
    return { authenticated: true, token };
  }
}

export { signup, signin };
