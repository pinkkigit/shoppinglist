import loginService from "../services/Login";
import listService from "../services/Lists";

const useSignIn = async ({ username, password }) => {
  const result = await loginService.login({ username, password });
  window.localStorage.setItem("shoppingListUser", JSON.stringify(result));
  listService.setToken(result.token);
  return result;
};

export default useSignIn;
