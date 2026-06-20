import {lazy, useState} from 'react'
import { get } from '@/src/utils/request'
import {View, StyleSheet, AppState, Text, ActivityIndicator} from "react-native";


const useLoadMore =
    <T extends Record<string, any>> (
        url: string,
        key: string,
        setData: (prev: (prevData: T | null) => T) => void
    )=> {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const onEndReached = async () => {
        if (loading) return
        if (!hasMore) return

        setLoading(true);

        try {
            const nextPage = page + 1;
            setPage(nextPage);
            const {data} = await get(url, {page: nextPage})
            if (data[key].length === 0) {
                setHasMore(false);
            } else {
                setData((prevData) => {
                    if (!prevData) return data
                    return {
                        [key]: [...prevData[key], ...data[key]]
                    }
                })
            }
        } finally {
            setLoading(false);
        }
    }

    const loadMoreFooter = () => {
        let message;
        if (loading) {
            message = "加载中...";
        } else if (!hasMore) {
            message = "没有更多了..."
        } else {
            message = "上拉加载更多..."
        }
        return (
            <View style={styles.container}>
                { loading && <ActivityIndicator size="small" color='#e29447' /> }
                <Text style={styles.message}>
                    {message}
                </Text>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 40,
        },
        message: {
            fontSize: 13,
            marginHorizontal: 16
        }
    })

    return { onEndReached, loadMoreFooter }
}

export default useLoadMore
