import {useLocalSearchParams} from "expo-router";
import ProgressWebView from "@/src/components/ProgressWebView";
import {useState} from "react";

export default function Details() {
    const { uri } = useLocalSearchParams();
    const uriString = Array.isArray(uri) ? uri[0] : uri || '';

    const [progress, setProgress] = useState<number>(0)

    return (<ProgressWebView
        props={{ source: {uri: uriString} }}
        progress={progress}
        setProgress={setProgress}
    />)
}