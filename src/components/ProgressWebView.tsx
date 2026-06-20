import {JSX} from "react";
import {View} from "react-native";
import {StyleSheet} from "react-native";
import WebView from "react-native-webview";
import {IOSWebViewProps, AndroidWebViewProps, WindowsWebViewProps} from "react-native-webview/lib/WebViewTypes";
import Loading from "@/src/components/Loading";

interface Props {
    props: JSX.IntrinsicAttributes
        & JSX.IntrinsicClassAttributes<WebView<{}>>
        & Readonly<IOSWebViewProps
        & AndroidWebViewProps
        & WindowsWebViewProps>

    progress: number;
    setProgress: (progress: number) => void;
}

export default function ProgressWebView(p : Props) {
    const { props, progress, setProgress } = p;

    return (
        <>
            <View style={styles.container}>
                <WebView
                    startInLoadingState={true}
                    renderLoading={() => <Loading />}
                    onLoadProgress={({ nativeEvent }) => {
                        setProgress(nativeEvent.progress);
                    }}
                    {...props}
                />
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})