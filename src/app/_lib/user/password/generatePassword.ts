export const generatePassword = () => {
  const length = 20;
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const specialCharacters = "!@#$%^&*()-_=+<>?";

  let password = "";

  // Ensure at least one special character
  password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));

  // Generate remaining characters randomly
  for (let i = 1; i < length; i++) {
    const allCharacters = characters + specialCharacters;
    password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
  }

  // Shuffle the password to avoid the special character always being at the start
  password = password.split("").sort(() => 0.5 - Math.random()).join("");

  return password;
}