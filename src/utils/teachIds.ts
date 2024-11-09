import { v4 as uuidv4 } from "uuid";

export function generateTeacherId(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";

  // Create array of 6 random characters
  const randomChars = Array.from({ length: 6 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  );

  // Join the characters and add the T- prefix
  return `T-${randomChars.join("")}`;
}

export function generateUUID(): string {
  return uuidv4();
}
