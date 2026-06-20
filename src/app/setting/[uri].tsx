import {useLocalSearchParams} from "expo-router";
import ProgressWebView from "@/src/components/ProgressWebView";
import {useState} from "react";
import {View} from "react-native";
import {StyleSheet} from "react-native";

const ProgressBar =
    ({progress} : { progress: number }) => {
        return <View style={[styles.loadingBar, { width: `${progress * 100}%` }]} />
    }

export default function Details() {
    const { uri } = useLocalSearchParams();
    const uriString = Array.isArray(uri) ? uri[0] : uri || '';

    const [progress, setProgress] = useState<number>(0)

    return (
        <>
            <ProgressBar progress={progress} />
            <ProgressWebView
                props={{ source: {uri: uriString} }}
                progress={progress}
                setProgress={setProgress}
            />
        </>
    )
}

const styles = StyleSheet.create({
    loadingBar: {
        backgroundColor: "#1f99b0",
        height: 2
    }
})