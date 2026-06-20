import {useState} from 'react'
import { get } from '@/src/utils/request'


const useLoadMore =
    <T extends Record<string, any>> (
        url: string,
        key: string,
        setData: (prev: (prevData: T | null) => T) => void
    )=> {
    const [page, setPage] = useState(1);
    const onEndReached = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        const { data } = await get(url, {page: nextPage})

        setData((prevData) => {
            if (!prevData) return data
            return {
                [key]: [...prevData[key], ...data[key]]
            }
        })
    }

    return { onEndReached }
}

export default useLoadMore
