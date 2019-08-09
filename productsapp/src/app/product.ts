import { Department } from './department';

export interface Product {
    name: String;
    departments: Department[];
    stock: Number;
    price: Number;
    _id ?: String;
}
