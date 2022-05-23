/* eslint-disable @typescript-eslint/naming-convention */
export interface CoffeeShopCreate {
    name: string;
    description: string;
    total_rate: number;
    image_represent: any;
    min_price: number;
    max_price: number;
    open_time: string;
    closed_time: string;
    phone_number: string;
    location: string;
    latitude: string;
    longitude: string;
}
