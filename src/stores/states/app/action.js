import Types from './';
// import Configs from '@configs';

export function test(first = 'None') {
    return {
        type: Types.TEST,
        payload: {
            data: first
        }
    }
}