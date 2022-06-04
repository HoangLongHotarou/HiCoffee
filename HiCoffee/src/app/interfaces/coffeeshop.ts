import { Category } from './category';
import { ImageCoffeeShop } from './image-coffee-shop';

/* eslint-disable @typescript-eslint/naming-convention */
export interface CoffeeShop {
    id?: number;
    name: string;
    description: string;
    total_rate: number;
    image_represent: any;
    minimum_price: number;
    max_price: number;
    open_time: string;
    closed_time: string;
    phone_number: string;
    location: string;
    latitude: string;
    longitude: string;
    imgs_cfs?: ImageCoffeeShop[];
    types_cfs: Category[];
}
