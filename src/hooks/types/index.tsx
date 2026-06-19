export const FETCH_SUCCESS = 'FETCH_SUCCESS' as const
export const FETCH_ERROR = 'FETCH_ERROR' as const
export const SET_DATA = 'SET_DATA' as const
export const RELOAD_START = 'RELOAD_START' as const

export type FetchAction<T> =
    | { type: typeof RELOAD_START }
    | { type: typeof FETCH_SUCCESS; payload: T }
    | { type: typeof FETCH_ERROR }
    | { type: typeof SET_DATA; payload: T }


export interface FetchState<T> {
    data: T | null
    loading: boolean
    error: boolean
}

export interface ApiWrapper<T> {
    status: boolean
    message: string
    data: T
}