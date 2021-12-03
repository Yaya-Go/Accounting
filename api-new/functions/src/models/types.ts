export type User = {
    username?: string,
    email: string,
    password?: string,
    userId?: string,
    token?: string,
    updatedAt?: string,
    createdAt?: string
}

export type Tag = {
    id?: string,
    name: string,
    userId: string,
    createdAt?: string,
    updatedAt?: string
}

export type Category = {
    id?: string,
    name: string,
    tagId: string,
    userId: string,
    createdAt?: string,
    updatedAt?: string
}

export type Transaction = {
    id?: string,
    name: string,
    desc?: string,
    categoryId: string,
    userId: string,
    transDate: string,
    type: string,
    total: number,
    subtotal?: number,
    tax?: number,
    createdAt?: string,
    updatedAt?: string
}

export type Item = {
    id?: string,
    name: string,
    desc?: string,
    price?: string,
    transId: string,
    userId: string,
    createdAt: string,
    updatedAt: string
}
