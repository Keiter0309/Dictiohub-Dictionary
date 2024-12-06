export enum EAdmin {
  ADMIN = "/api/v1/admin",
  CREATE_USER = "/api/v1/admin/create",
  DELETE_USER = "/api/v1/admin/delete/:email",
  FETCH_USERS = "/api/v1/admin/users",
  FETCH_USER = "/api/v1/admin/user/email/:email",
  FETCH_USER_BY_ID = "/api/v1/admin/user/id/:id",
  UPDATE_USER = "/api/v1/admin/update/:id",
  LOGIN = "/api/v1/admin/login",

  // Word management urls
  FETCH_WORD = "/api/v1/admin/words/:id",
  CREATE_WORD = "/api/v1/admin/words/create",
  DELETE_WORD = "/api/v1/admin/words/delete/:id",
  UPDATE_WORD = "/api/v1/admin/words/update/:id",
  FETCH_WORDS = "/api/v1/admin/words",

  // Category management urls
  FETCH_CATEGORY = "/api/v1/admin/categories/:id",
  CREATE_CATEGORY = "/api/v1/admin/categories/create",
  DELETE_CATEGORY = "/api/v1/admin/categories/delete/:id",
  UPDATE_CATEGORY = "/api/v1/admin/categories/update/:id",
  FETCH_CATEGORIES = "/api/v1/admin/categories",
}
