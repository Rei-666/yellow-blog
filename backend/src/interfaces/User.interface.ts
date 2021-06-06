interface User extends Express.User {
  id: string,
  username: string,
  passwordHash: string,
  emailAdress: string,
}

export default User;
