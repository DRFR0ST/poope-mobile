import { useRef, useEffect } from 'react';
import { FireClient } from './client';
import { useSignal } from '../utils/hooks/general';
import config from '../../config';

const HOST_URL = config.host_url;
const cli = new FireClient(HOST_URL);

export const useCommand = (command: any, ...args: any[]) => {
    const ref = useRef(null as unknown as { status: number, data?: any, message?: string });
    const signal = useSignal();

    useEffect(() => {
        ref.current = { status: 102 };

        const fn = async () => {
            const _args = args || [];

            const rq = await cli.execute(new command(..._args))
            ref.current = rq;
            signal();
        }
        fn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ref.current;
}

/**
 * 
 * @param command 
 * @param args 
 * @example
 * const dispatchCommand = useDispatchCommand();
 * ...
 * dispatchCommand(AccountCreate, "mike.eling97@gmail.com", "ThisIsMyPassBro")
 */
export const useDispatchCommand = () => {
    const ref = useRef(null as unknown as (command: any, ...args: any[]) => Promise<{ status: number, data: any }>);
    const signal = useSignal();

    if (ref.current === null) {

        const fn = async (command: any, ...args: any[]) => {
            const _args = args || [];

            const rq = await cli.execute(new command(..._args))
            signal();
            return rq;
        }
        ref.current = (command: any, ...args: any[]) => fn(command, ...args);
    }

    return ref.current;
}