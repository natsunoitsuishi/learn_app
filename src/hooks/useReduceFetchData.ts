import { useEffect, useReducer, useCallback } from 'react'
import { get } from '@/src/utils/request'
import {ApiWrapper, FetchState} from "@/src/hooks/types";
import {FETCH_ERROR, FETCH_SUCCESS, FetchAction, RELOAD_START, SET_DATA} from "@/src/hooks/types";

function reducer<T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> {
  switch (action.type) {
    case RELOAD_START:
      return {
        ...state,
        loading: true,
        error: false,
      }

    case FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      }

    case FETCH_ERROR:
      return {
        ...state,
        data: null,
        loading: false,
        error: true,
      }

    case SET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      }

    default:
      return state
  }
}

/**
 * @param url 请求地址
 * @param params 请求参数对象
 */
const useReduceFetchData = <
  T = unknown,
  P extends Record<string, any> | undefined = Record<string, any> | undefined,
>(
  url: string,
  params: P = {} as P,
) => {
  const initialState: FetchState<T> = {
    data: null,
    loading: true,
    error: false,
  }

  const [state, dispatch] = useReducer(reducer<T>, initialState)

  const fetchData = useCallback(async () => {
    try {
      const { data } = await get<ApiWrapper<T>>(url, params)
      dispatch({ type: FETCH_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: FETCH_ERROR })
    }
  }, [url, params])

  const onReload = async () => {
    dispatch({ type: RELOAD_START })
    fetchData().then((r) => {})
  }

  const setData = (newData: T) => {
    dispatch({ type: SET_DATA, payload: newData })
  }

  useEffect(() => {
    fetchData().then((r) => {})
  }, [url, JSON.stringify(params)])

  return {
    ...state,
    onReload,
    setData,
  }
}

export default useReduceFetchData
