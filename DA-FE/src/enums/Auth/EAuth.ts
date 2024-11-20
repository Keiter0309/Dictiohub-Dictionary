export enum EAuth {
  AUTH_REGISTER = 'api/v1/auth/register',
  AUTH_LOGIN = 'api/v1/auth/login',
  AUTH_FORGOT_PASSWORD = 'api/v1/auth/forgot-password',
  AUTH_RESET_PASSWORD = 'api/v1/auth/reset-password',
  AUTH_CHANGE_PASSWORD = 'api/v1/auth/change-password',
  AUTH_ME = 'api/v1/auth/me',
  AUTH_CLIENT_DOMAIN = 'https://dictiohub.site',
}

const checkLocalhost = async (): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:9000', { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

const getAuthClientHost = async (): Promise<string> => {
  const isLocalhostAvailable = await checkLocalhost();
  return isLocalhostAvailable
    ? 'http://localhost:9000'
    : EAuth.AUTH_CLIENT_DOMAIN;
};

let AUTH_CLIENT_HOST: string;
getAuthClientHost().then((host) => {
  AUTH_CLIENT_HOST = host;
});

export { AUTH_CLIENT_HOST };
