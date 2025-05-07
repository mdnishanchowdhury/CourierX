import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./usersRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auths/login/", user);

    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};