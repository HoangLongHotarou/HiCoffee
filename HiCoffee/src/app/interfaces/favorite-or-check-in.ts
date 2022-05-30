/* eslint-disable @typescript-eslint/naming-convention */
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
export interface FavoriteOrCheckIn {
    id: number;
    coffee_shop: CoffeeShop | number;
    type: number;
}
