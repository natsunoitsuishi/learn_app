import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    TouchableWithoutFeedback, ListRenderItem, Image
} from 'react-native'

import useFetchData from "@/src/hooks/useReduceFetchData";
import Loading from "@/src/components/Loading";
import NetworkError from "@/src/components/NetworkError";
import {ArticleItem, ArticleResponse} from "@/src/types";
import {Link, Stack} from "expo-router";

export default function ArticlesIndex() {
    const { data, loading, error, refresh, onReload, onRefresh, setData } =
        useFetchData<ArticleResponse>('/articles')

    const articles = data?.articles ?? []

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <NetworkError title="" onReload={onReload} />
    }
    
    const renderItem: ListRenderItem<ArticleItem> = ({ item }) => {
        return (
            <>
                <Stack.Screen
                    options={{
                        title: '通知',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerTitleAlign: 'center',
                    }}
                />
                <Link asChild href={{ pathname: '/articles/[id]', params: {id: item.id} }}>
                    <TouchableWithoutFeedback>
                        <View style={styles.item}>
                            <Image />
                            <View style={styles.titleWrapper}>
                                <Text style={styles.title} numberOfLines={2}>
                                    {item.title}
                                </Text>
                                <Text style={styles.createdAt}>{item.createdAt}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Link>
            </>
        )
    }

    const renderSeparator = () => <View style={styles.separator} />
    return (
        <FlatList 
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
            data={articles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
            refreshControl={
            <RefreshControl 
                refreshing={refresh}
                onRefresh={onRefresh}
                tintColor={'#1f99b0'}
            />
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {
    },
    contentContainerStyle: {
    },
    image: {
        height: 70,
        width: 70,
        alignSelf: 'center',
    },
    item: {
        paddingBottom: 20,
    },
    titleWrapper: {
        flex: 1,
        paddingRight: 8,
        backgroundColor: 'transparent',
    },
    title: {
        marginTop: 18,
        fontSize: 12,
        fontWeight: '300',
        height: 40,
        lineHeight: 18,
        color: '#333'
    },
    createdAt: {
        textAlign: 'right',
        fontSize: 10,
        fontWeight: '300',
        color: '#555'
    },
    separator: {
        height: 1.2,
        backgroundColor: '#e7dfd3',
        marginLeft: 15,
        marginRight: 0
    }
})