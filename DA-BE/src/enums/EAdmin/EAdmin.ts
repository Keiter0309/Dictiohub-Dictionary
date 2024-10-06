export enum EAdmin {
    ADMIN = "/api/v1/admin",
    CREATE_USER = "/api/v1/admin/create",
    DELETE_USER = "/api/v1/admin/delete/:email",
    FETCH_USERS = "/api/v1/admin/users",
    FETCH_USER = "/api/v1/admin/user/:email",
    UPDATE_USER = "/api/v1/admin/update/:id",
    LOGIN = "/api/v1/admin/login",
}