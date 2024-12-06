// apicore
import { APICore } from '../../helpers/api/apiCore';

// constants
import { AuthActionTypes } from './constants';

const api = new APICore();

const INIT_STATE = {
    user: api.getLoggedInUser(),
    loading: false,
    userLoggedIn: false,
    userSignUp: false,
    userLogout: false,
    error: null,
    resetPasswordSuccess: null,
    passwordReset: false,
    passwordChange: false,
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

type AuthActionType = {
    type:
        | AuthActionTypes.API_RESPONSE_SUCCESS
        | AuthActionTypes.API_RESPONSE_ERROR
        | AuthActionTypes.LOGIN_USER
        | AuthActionTypes.SIGNUP_USER
        | AuthActionTypes.LOGOUT_USER
        | AuthActionTypes.UNLOCK_USER // Ação de desbloqueio de usuário
        | AuthActionTypes.RESET;
    payload: {
        actionType?: string;
        data?: UserData | {};
        error?: string;
    };
};

type State = {
    user?: UserData | {} | null;  // Ajuste aqui para permitir `null`
    loading?: boolean;
    error?: string | null;
    userLoggedIn?: boolean;
    userSignUp?: boolean;
    userLogout?: boolean;
    resetPasswordSuccess?: boolean | null;
    passwordReset?: boolean;
    passwordChange?: boolean;
};

const Auth = (state: State = INIT_STATE, action: AuthActionType): State => {
    switch (action.type) {
        case AuthActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER:
                    return {
                        ...state,
                        user: action.payload.data,
                        userLoggedIn: true,
                        loading: false,
                    };
                case AuthActionTypes.SIGNUP_USER:
                    return {
                        ...state,
                        userSignUp: true,
                        loading: false,
                    };
                case AuthActionTypes.LOGOUT_USER:
                    return {
                        ...state,
                        user: null,  // Agora `null` é permitido
                        userLogout: true,
                        loading: false,
                    };
                case AuthActionTypes.UNLOCK_USER:
                    return {
                        ...state,
                        user: action.payload.data,
                        userLoggedIn: true,
                        loading: false,
                    };
                default:
                    return { ...state };
            }

        case AuthActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER:
                    return {
                        ...state,
                        error: action.payload.error,
                        userLoggedIn: false,
                        loading: false,
                    };
                case AuthActionTypes.SIGNUP_USER:
                    return {
                        ...state,
                        error: action.payload.error,
                        userSignUp: false,
                        loading: false,
                    };
                case AuthActionTypes.UNLOCK_USER:
                    return {
                        ...state,
                        error: action.payload.error,
                        userLoggedIn: false,
                        loading: false,
                    };
                default:
                    return { ...state };
            }

        case AuthActionTypes.LOGIN_USER:
        case AuthActionTypes.UNLOCK_USER: // Manipula o início da ação de desbloqueio de usuário
            return { ...state, loading: true, userLoggedIn: false };
        
        case AuthActionTypes.SIGNUP_USER:
            return { ...state, loading: true, userSignUp: false };
        
        case AuthActionTypes.LOGOUT_USER:
            return { ...state, loading: true, userLogout: false };

        case AuthActionTypes.RESET:
            return {
                ...state,
                loading: false,
                error: null,
                userSignUp: false,
                userLoggedIn: false,
                userLogout: false,
                resetPasswordSuccess: null,
                passwordReset: false,
                passwordChange: false,
            };

        default:
            return { ...state };
    }
};

export default Auth;
