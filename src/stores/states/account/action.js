import Types from './';
import Configs from '../../../utils/configs';

export function login(username = '', password = '') {
    return {
        type: Types.LOGIN,
        payload: {
            api: Configs.API_ACCOUNT + '/TokenAuth/Authenticate',
            method: 'POST',
            payload: {
                userNameOrEmailAddress: username,
                password: password,
            },
        }
    }
}

export function logOut(data = '') {
    return {
        type: Types.LOGOUT,
        payload: {
            storage: {
                key: 'LOGOUT',
                type: 'setString',
                data: data
            }
        }
    }
}

export function getTenant(accessToken = '', MaxResultCount = 10, SkipCount = 0) {
    return {
        type: Types.GET_TENANT,
        payload: {
            api: Configs.API + `/UserLink/GetLinkedAccount?MaxResultCount=${MaxResultCount}&SkipCount=${SkipCount}`,
            method: 'GET',
            token: accessToken
        }
    }
}

export function switchToUserAccount(accessToken = '', TenantId = '', UserId = '') {
    return {
        type: Types.GET_SWITCHTOUSERACCOUNT,
        payload: {
            api: Configs.API + `/UserLink/SwitchToUserAccount?targetTenantId=${TenantId}&targetUserId=${UserId}`,
            method: 'GET',
            token: accessToken
        }
    }
}

export function linkedAccountAuthenticate(accessToken = '', switchAccountToken = '') {
    return {
        type: Types.LINKEDACCOUNTAUTHEN,
        payload: {
            api: Configs.API + `/TokenAuth/LinkedAccountAuthenticate?switchAccountToken=${switchAccountToken}`,
            method: 'POST',
            token: accessToken
            // payload: {
            //     switchAccountToken: switchAccountToken
            // }
        }
    }
}

export function setIsAccessTokenAPI(bool = true) {
    return {
        type: Types.SET_IS_GETACCESSTOKEN_API,
        payload: bool
    }
}



export function sendPasswordResetCode(email) {
    return {
        type: Types.SENDCODERESETPASS,
        payload: {
            api: Configs.API_ACCOUNT + '/services/app/Account/SendPasswordResetCode',
            method: 'POST',
            payload: {
                emailAddress: email,
            },
        }
    }
}

export function resetPassword(codeVerify = '', pass = '') {
    return {
        type: Types.RESETPASSWORD,
        payload: {
            api: Configs.API_ACCOUNT + '/services/app/Account/AppResetPassword',
            method: 'POST',
            payload: {
                resetCode: codeVerify,
                password: pass
            },
        }
    }
}

// ! set accessToken
export function setAccessTokenLocal(data) {
    return {
        type: Types.SET_ACCESSTOKEN,
        payload: {
            storage: {
                key: 'ACCESSTOKEN',
                type: 'setString',
                data: data
            }
        }
    }
}

export function getAccessTokenLocal() {
    return {
        type: Types.GET_ACCESSTOKEN,
        payload: {
            storage: {
                key: 'ACCESSTOKEN',
                type: 'getString',
            }
        }
    }
}

// ! set accessTokenApi
export function setAccessApiTokenLocal(data) {
    return {
        type: Types.SET_ACCESSTOKEN_API,
        payload: {
            storage: {
                key: 'ACCESSTOKEN_API',
                type: 'setString',
                data: data
            }
        }
    }
}

export function getAccessApiTokenLocal() {
    return {
        type: Types.GET_ACCESSTOKEN_API,
        payload: {
            storage: {
                key: 'ACCESSTOKEN_API',
                type: 'getString',
            }
        }
    }
}

// ! set tenant
export function setTenantLocal(data) {
    return {
        type: Types.SET_TENNANT_LOCAL,
        payload: {
            storage: {
                key: 'TENNANT_LOCAL',
                type: 'setArrayObject',
                data: data
            }
        }
    }
}

export function getTenantLocal() {
    return {
        type: Types.GET_TENNANT_LOCAL,
        payload: {
            storage: {
                key: 'TENNANT_LOCAL',
                type: 'getArrayObject',
            }
        }
    }
}
