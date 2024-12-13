import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore } from "../../helpers/api/apiCore";

import { setAuthorization } from "../../../src/helpers/api/auth";

import { forgotPassword as forgotPasswordApi } from "../../redux/auth/actions";

// helpers
import {
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
} from "../../helpers/";

// actions
import { authApiResponseSuccess, authApiResponseError } from "./actions";

// constants
import { AuthActionTypes } from "./constants";

type UserData = {
  payload: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    contact: string;
    password: string;
  };
  type: string;
};

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({
  payload: { email, password },
  type,
}: UserData): SagaIterator {
  try {
    const response = yield call(loginApi, { email, password });
    const user = response.data;
    // NOTE - You can change this according to response format from your api
    api.setLoggedInUser(user);
    setAuthorization(user["token"]);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

/**
 * Logout the user
 */
function* logout(): SagaIterator {
  try {
    yield call(logoutApi);
    api.setLoggedInUser(null);
    setAuthorization(null);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
  }
}

function* signup({
  payload: { first_name, last_name, username, email, contact, password },
}: {
  payload: { first_name: string; last_name: string; username: string; email: string; contact: string; password: string };
}): SagaIterator {
  try {
    const params = {
      first_name,
      last_name,
      username,
      email,
      contact: contact.replace(/\D/g, ''), // Garantindo que o contato contenha apenas números
      password,

    const response = yield call(signupApi, params);
    console.log('Resposta da API:', response);
    yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, response.data));
  } catch (error: any) {
    console.error('Erro na saga signup:', error);
    yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
  }
}





function* forgotPassword({ payload: { email } }: UserData): SagaIterator {
  try {
    const response = yield call(forgotPasswordApi, email);
    yield put(
      authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data)
    );
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
  }
}
export function* watchLoginUser() {
  yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout() {
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
  yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword(): any {
  yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchForgotPassword),
  ]);
}

export default authSaga;
