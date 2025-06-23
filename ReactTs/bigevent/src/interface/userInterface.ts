export interface userLogin{
    username:string,
    password:string
}

export interface homeData {
    ids:string[],
    userId:string
}
export interface AddUser{
    username:string,
    password:string,
    email:string,
}
export interface user{
    username:string,
    email?:string,
    createTime:string,
    updateTime:string
}