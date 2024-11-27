export enum EAdmin {
  ADMIN_LOGIN = 'api/v1/admin/login',
  ADMIN_CREATE_USER = 'api/v1/admin/create',
  ADMIN_DELETE_USER = 'api/v1/admin/delete',
  ADMIN_FETCH_USERS = 'api/v1/admin/users',
  ADMIN_FETCH_USER = 'api/v1/admin/user/email',
  ADMIN_UPDATE_USER = 'api/v1/admin/update',

  // Words management endpoints
  ADMIN_FETCH_WORDS = 'api/v1/admin/words',
  ADMIN_FETCH_WORD = 'api/v1/admin/words',
  ADMIN_CREATE_WORD = 'api/v1/admin/words/create',
  ADMIN_UPDATE_WORD = 'api/v1/admin/words/update',
  ADMIN_DELETE_WORD = 'api/v1/admin/words/delete',
}

const ADMIN_CLIENT_HOST: string = import.meta.env.VITE_API_BASE_URL;

export { ADMIN_CLIENT_HOST };
