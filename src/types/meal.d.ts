import { IUser } from "./user";

export interface IMeal {
    id: string;
    amount: number;
    timestamp: Date;
    author: IUser;
}