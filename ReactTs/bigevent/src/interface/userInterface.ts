export interface userLogin{
    username:string,
    password:string
}

export interface homeData {
    ids:string[],
    userId:string
}

export interface user{
    username:string,
    email?:string,
    createTime:string,
    updateTime:string
}