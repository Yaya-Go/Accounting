export interface User {
    userId?: string;
    email: string;
    username?: string;
    updatedAt?: string;
    createdAt?: string;
}

export interface Tag {
    tagId?: string;
    name: string;
    updatedAt?: string;
    createdAt?: string;
    metadata?: any;
}

export interface Category {
    tagId: string;
    categoryId?: string;
    name: string;
    updatedAt?: string;
    createdAt?: string;
    metadata?: any;
}

export interface Transaction {
    categoryId: string;
    transId?: string;
    name: string;
    desc?: string;
    updatedAt?: string;
    createdAt?: string;
    transDate: string;
    total: number;
    tax?: number;
    subtotal?: number;
    metadata?: any;
}

export interface Item {
    transId: string;
    itemId?: string;
    name: string;
    desc?: string;
    updatedAt?: string;
    createdAt?: string;
    price?: string;
    metadata?: any;
}