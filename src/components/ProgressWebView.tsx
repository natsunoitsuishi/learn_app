import {JSX} from "react";
import {View} from "react-native";
import {StyleSheet} from "react-native";
import WebView, {WebViewNavigation} from "react-native-webview";
import {IOSWebViewProps, AndroidWebViewProps, WindowsWebViewProps} from "react-native-webview/lib/WebViewTypes";
import Loading from "@/src/components/Loading";
import * as WebBrowser from "expo-web-browser";

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

    const onShouldStartLoadWithRequest = (request: WebViewNavigation): boolean => {
        const currentUri = (props.source as { uri: string }).uri;

        if (currentUri === request.url) {
            console.log("Hello, World");
            return true;
        }

        WebBrowser.openBrowserAsync(request.url).catch(console.error);
        return false;
    };

    return (
        <>
            <View style={styles.container}>
                <WebView
                    userAgent="clwy-app"
                    startInLoadingState={true}
                    renderLoading={() => <Loading />}
                    onLoadProgress={({ nativeEvent }) => {
                        setProgress(nativeEvent.progress);
                    }}
                    onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                    {...props}
                    setSupportMultipleWindows={false}
                    javaScriptEnabled
                    domStorageEnabled
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