import cookie from "js-cookie";

export const verifyToken = (username, password) => {
  console.log("api");
  // fetch to api to verify the token
  const token = "thisistoken";
  cookie.set("token", token);
  return token;
};

export const removeToken = () => {
  cookie.remove("token");
};
