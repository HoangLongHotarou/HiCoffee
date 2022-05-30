import { FavoriteOrCheckIn } from './favorite-or-check-in';
import { Hobby } from './hobby';
/* eslint-disable @typescript-eslint/naming-convention */
export interface Information {
    id: number;
    image_link?: string;
    birthday: string;
    user: any;
    role: number;
    info_hobbies: Hobby[];
    info_marks: FavoriteOrCheckIn[];
}
