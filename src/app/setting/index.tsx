import {Alert, ScrollView, StyleSheet, Text} from "react-native";
import {TableView, Cell, Section} from "clwy-react-native-tableview-simple/src";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import {useRouter} from "expo-router";

const sectionProps = {
    hideSurroundingSeparators: true,
    roundedCorners: true,
    sectionPaddingTop: 20,
    separatorInsetRight: 18,
    separatorTintColor: '#ddd',
} as const;

const CellProps = {
    accessory: "DisclosureIndicator",
    titleTextStyle: { textAlign: 'left', fontSize: 17 },
    contentContainerStyle: { height: 55 },
    backgroundColor: "#fff",
    titleTextColor: "#67c1b5",
} as const;

export default function Setting() {

    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <TableView>
                <Section {...sectionProps}>
                    <Cell { ...CellProps } title="Wiki" />
                    <Cell { ...CellProps } title="常用站点"
                        onPress={() => {
                            router.push({
                                pathname: "/setting/[uri]",
                                params: {
                                    uri: 'https://clwy.cn/sites',
                                    title: '常用站点',
                                }
                            })
                        }}
                    />
                </Section>


                <Section {...sectionProps}>
                    <Cell { ...CellProps } title="关于natsuno" />
                    <Cell { ...CellProps } title="使用条款" />
                    <Cell { ...CellProps } title="隐私政策" />
                    <Cell { ...CellProps } title="注销账号" />
                    <Cell { ...CellProps } title="App 备案号" onPress={() => {
                        Alert.alert('备案号', '鄂ICP备13016268号-11')
                    }}/>
                </Section>

                <Section {...sectionProps}>
                    <Cell { ...CellProps } title="安全退出" titleTextColor="red"/>
                </Section>
            </TableView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        flex: 1,
    },
})