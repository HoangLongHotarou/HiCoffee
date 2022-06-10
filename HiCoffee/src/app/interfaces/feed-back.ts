import { User } from './user';

/* eslint-disable @typescript-eslint/naming-convention */
export interface FeedBack {
    id: number;
    vote_rate: number;
    feedback: string;
    user: User;
    customer_fake: string;
    fb_images: string[];
}
