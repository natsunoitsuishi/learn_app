import {View, Text} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";
import {StyleSheet} from "react-native";
import useFetchData from "@/src/hooks/useReduceFetchData";
import {ArticleResponse} from "@/src/types";
import {ArticleItem} from "@/src/types";
import ProgressWebView from "@/src/components/ProgressWebView";
import {useState} from "react";

const ProgressBar =
    ({progress} : { progress: number }) => {
        return <View style={[styles.loadingBar, { width: `${progress * 100}%` }]} />
    }

export default function ArticlePage() {
    const { id } = useLocalSearchParams()
    const { data } = useFetchData<ArticleResponse>(`/articles/${id}`)
    const article = data?.articles as unknown as ArticleItem;

    const [progress, setProgress] = useState<number>(0)

    return (
        <>
            <ProgressBar progress={progress} />
            <View style={styles.container}>
            <Text style={styles.title}>{article?.title}</Text>
            <Text style={styles.info}>{ article?.content }</Text>
            <ProgressWebView
                props={{ source: {uri: 'https://clwy.cn'} }}
                progress={progress}
                setProgress={setProgress}
            />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#4f9df7'
    },
    info: {
        marginTop: 20,
        fontSize: 20,
        color: '#67c1b5'
    },
    loadingBar: {
        backgroundColor: "#1f99b0",
        height: 2
    }
})