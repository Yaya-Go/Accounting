export interface User {
    userId?: string;
    email: string;
    username?: string;
    updatedAt?: string;
    createdAt?: string;
}

export interface Tag {
    id?: string;
    name: string;
    updatedAt?: string;
    createdAt?: string;
    metadata?: any;
    category?: Category[]
}

export interface Category {
    tagId: string;
    id?: string;
    name: string;
    updatedAt?: string;
    createdAt?: string;
    metadata?: any;
}

export interface Transaction {
    categoryId: string;
    id?: string;
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
    id?: string;
    name: string;
    desc?: string;
    updatedAt?: string;
    createdAt?: string;
    price?: string;
    metadata?: any;
}