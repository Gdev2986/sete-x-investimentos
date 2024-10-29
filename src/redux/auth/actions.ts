// Importando as constantes necessárias
import { AuthActionTypes } from './constants';

export type AuthActionType = {
    type:
        | AuthActionTypes.API_RESPONSE_SUCCESS
        | AuthActionTypes.API_RESPONSE_ERROR
        | AuthActionTypes.FORGOT_PASSWORD
        | AuthActionTypes.FORGOT_PASSWORD_CHANGE
        | AuthActionTypes.LOGIN_USER
        | AuthActionTypes.LOGOUT_USER
        | AuthActionTypes.RESET
        | AuthActionTypes.SIGNUP_USER
        | AuthActionTypes.UNLOCK_USER; 
    payload: {} | string;
};

type UserData = {
    id: number;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
};

// Função genérica de resposta de sucesso
export const authApiResponseSuccess = (actionType: string, data: UserData | {}): AuthActionType => ({
    type: AuthActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

// Função genérica de resposta de erro
export const authApiResponseError = (actionType: string, error: string): AuthActionType => ({
    type: AuthActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

// Ação de login do usuário
export const loginUser = (email: string, password: string): AuthActionType => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: { email, password },
});

// Ação de logout do usuário
export const logoutUser = (): AuthActionType => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {},
});

// Ação de cadastro de usuário
export const signupUser = (fullname: string, email: string, password: string): AuthActionType => ({
    type: AuthActionTypes.SIGNUP_USER,
    payload: { fullname, email, password },
});

// Ação de recuperação de senha
export const forgotPassword = (email: string): AuthActionType => ({
    type: AuthActionTypes.FORGOT_PASSWORD,
    payload: { email },
});

// Ação para resetar a autenticação
export const resetAuth = (): AuthActionType => ({
    type: AuthActionTypes.RESET,
    payload: {},
});

// Nova ação de desbloqueio do usuário
export const unlockUser = (username: string, password: string): AuthActionType => ({
    type: AuthActionTypes.UNLOCK_USER,
    payload: { username, password },
});
