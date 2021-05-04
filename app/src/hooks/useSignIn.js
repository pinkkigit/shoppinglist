import loginService from "../services/Login";

const useSignIn = async ({ username, password }) => {
  const result = await loginService.login({ username, password });
  window.localStorage.setItem("shoppingListUser", JSON.stringify(result));
  return result;
};

export default useSignIn;
