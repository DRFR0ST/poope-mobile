export type TResponse = { status: number, message?: string, data: any };

export interface IFireClient {
    url: string
}

export class FireClient implements IFireClient {
    url: string

    constructor(url: string) {
        this.url = url;
    }

    makeArguments(args: { [key: string]: string }) {
        return Object.entries(args).map((e => `${e[0]}=${typeof e[1] === "object" ? JSON.stringify(e[1]) : e[1]}`)).join("&");
    }

    execute<T>(command: IFireCommand<T>) {
        return new Promise<{ status: number, data: any }>((resolve, reject) => {
            let once = false;
            const cmd = command.exec[0];
            const args = this.makeArguments(command.exec[1]);

            const reqUrl = `${this.url}${cmd}?${args}`;

            const handleResolve = (response: any) => {
                if (!once) {
                    once = true;

                    const parsed_response = response

                    console.log("📶", cmd, "=>", parsed_response);
                    resolve(parsed_response);
                }

            }

            let headers = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data'
            });

            fetch(reqUrl, { mode: "cors", headers })
                .then(response => response.json())
                .then(handleResolve)
                .catch(reject);
        })
    }
}

type TFireCommandExec = [string, { [key: string]: any }];

export interface IFireCommand<T, R = T> {
    exec: TFireCommandExec;
    status: number;

    /** Parse received data. */
    parse(status: number, data: T): R
}

export class FireCommand<T, R = T> implements IFireCommand<T, R> {
    exec: TFireCommandExec;
    status: number;

    constructor(exec: TFireCommandExec) {
        this.exec = exec;
        this.status = 0;
    }

    parse(status: number, data: T): R {
        return data as unknown as R;
    }
}