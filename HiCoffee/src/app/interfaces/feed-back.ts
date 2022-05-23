/* eslint-disable @typescript-eslint/naming-convention */
import { User } from './auth.interface/user';

export interface FeedBack {
    id: number;
    vote_rate: number;
    feedback: string;
    user: User;
    customer_fake: string;
}
