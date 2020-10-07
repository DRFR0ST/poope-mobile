import { IUser } from "../types/user";
import { FireCommand } from "./client";

export class UserInfo extends FireCommand<IUser> {
    constructor(id: string) {
        super(["users-userInfo", { id }]);
    }

    parse(status, data) {
        if (status !== 200) return data;

        // TODO: Ensure types.

        return data;
    }
}

export class UserList extends FireCommand<IUser[]> {
    constructor() {
        super(["users-userList", {}]);
    }

    parse(status: number, data: any) {
        if (status !== 200) return data;
        
        return data;
    }
}

export class MealInfo extends FireCommand<IUser> {
    constructor(id: string) {
        super(["meals-mealInfo", { id }]);
    }

    parse(status, data) {
        if (status !== 200) return data;

        // TODO: Ensure types.

        return data;
    }
}

export class MealList extends FireCommand<IUser[]> {
    constructor() {
        super(["meals-mealList", {}]);
    }

    parse(status: number, data: any) {
        if (status !== 200) return data;

        return data;
    }
}

export class MealCreate extends FireCommand<{ id: string }> {
    constructor(amount: number, author_id: number) {
        super(["meals-mealCreate", { amount, author_id }]);
    }

    parse(status, data) {
        if (status !== 200) return data;

        // TODO: Ensure types.

        return data;
    }
}