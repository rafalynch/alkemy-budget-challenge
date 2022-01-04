import { User } from "../models/users";

// Return a user form user ID
async function getUserById(id: number) {
  const user = await User.findOne({ where: { id } });
  return user;
}

export { getUserById };
