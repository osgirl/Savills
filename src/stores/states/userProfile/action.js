import Types from './';
import Configs from '../../../utils/linkApi';

export function getCurrentLoginInformations(accessTokenAPI) {
  return {
    type: Types.GET_USER_INFORMATION,
    payload: {
      api: Configs.API + '/api/services/app/Session/GetCurrentLoginInformations',
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function getImageUserProfile(accessTokenAPI) {
  return {
    type: Types.GET_IMAGE_USER,
    payload: {
      api: Configs.API + '/api/services/app/Profile/GetProfilePicture',
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function updateCurrentUserProfile(accessTokenAPI, profile = {}) {
  return {
    type: Types.UPDATE_USER_PROFILE,
    payload: {
      api: Configs.API + '/api/services/app/Profile/UpdateCurrentUserProfile',
      method: 'PUT',
      token: accessTokenAPI,
      payload: {
        name: profile.name,
        surname: profile.surname,
        displayName: profile.displayName,
        userName: profile.userName,
        emailAddress: profile.emailAddress,
        phoneNumber: profile.phoneNumber,
        isGoogleAuthenticatorEnabled: profile.isGoogleAuthenticatorEnabled,
        isPhoneNumberConfirmed: profile.isPhoneNumberConfirmed,
        qrCodeSetupImageUrl: profile.qrCodeSetupImageUrl,
        timezone: profile.timezone
      }
    }
  };
}

export function changeAvatarProfile(accessTokenAPI, file) {
  return {
    type: Types.UPLOAD_AVATAR,
    payload: {
      api: Configs.API + '/Profile/UploadProfilePicture',
      method: 'POST',
      token: accessTokenAPI,
      file
    }
  };
}

export function updateAvatarProfile(accessTokenAPI, fileName, width = 500, height = 500, x = 0, y = 0) {
  return {
    type: Types.UPDATE_AVATAR,
    payload: {
      api: Configs.API + '/api/services/app/Profile/UpdateProfilePicture',
      method: 'PUT',
      token: accessTokenAPI,
      payload: {
        fileName: fileName,
        x: x,
        y: y,
        width: width,
        height: height,
        mimeType: 'image/jpeg'
      }
    }
  };
}
