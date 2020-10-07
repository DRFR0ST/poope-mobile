import { useRef, useEffect } from 'react';
import { FireClient } from './client';
import { useSignal } from '../utils/hooks/general';
import config from '../../config';

const HOST_URL = config.host_url;
const cli = new FireClient(HOST_URL);

type CommandReturn<T = any> = { status: number, data?: T, message?: string, _refresh: () => void };
export const useCommand = <T>(command: any, ...args: any[]) => {
    const ref = useRef(null as unknown as CommandReturn<T>);
    const signal = useSignal();

    const fetchFn = async () => {
        const _args = args || [];

        const rq = await cli.execute(new command(..._args))
        ref.current = { ...rq, _refresh: fetchFn };
        signal();
    }

    useEffect(() => {
        ref.current = { status: 102 };

        fetchFn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ref.current as CommandReturn<T>;
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

        ref.current = async (command: any, ...args: any[]) => {
            const _args = args || [];

            const rq = await cli.execute(new command(..._args))
            signal();
            return rq;
        }
    }

    return ref.current;
}