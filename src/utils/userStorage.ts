import AuthStore from "./AuthStore";

export const saveUserInfo = (wallet: string, name: string, email: string) => {
  const userKey = `user_${wallet}`;
  AuthStore.setAccessToken(JSON.stringify({ name, email }),userKey);
};

export const getUserInfo = (wallet: string) => {
  const userKey = `user_${wallet}`;
  const data = AuthStore.getAccessToken(userKey);
  return data ? JSON.parse(data) : null;
};
