import {
    Text, View, StyleSheet, FlatList, Image, ListRenderItem, TouchableWithoutFeedback
} from 'react-native'
import { Link } from 'expo-router'
import {CourseItem} from "@/src/types";

type coursesType = {
    course: CourseItem[],
    title: string,
}

export default function CoursesList ({course, title}: coursesType) {

    const renderItem: ListRenderItem<CourseItem> = ({ item, index }) => {
        return (
        <Link asChild href={{ pathname: '/teachers/[id]', params: { id: item.id } }}>
            <TouchableWithoutFeedback>
                <View
                    style={[
                        styles.course,
                        index === 0 ? styles.first : null,
                        index === course.length - 1 ? styles.last : null
                    ]}
                >
                    <Image
                        source={{
                            uri: item.image?.replace(
                                'http://localhost:3000',
                                process.env.EXPO_PUBLIC_API_URL || ''
                            ) || '' }}
                        style={styles.image}
                    />

                    <View style={styles.content}>
                        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                        <View style={styles.countWrapper}>
                            <Text style={styles.count}>全{item.chaptersCount}回</Text>
                        </View>
                        <Text style={styles.category}>{item.category.name}</Text>
                    </View>
                </View>

            </TouchableWithoutFeedback>
        </Link>
    )
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.heading}>{title}</Text>
                </View>
                <FlatList
                    data={course}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 6
    },
    first: {
        marginLeft: 10
    },
    last: {
        marginRight: 10
    },
    course: {
        marginRight: 8,
        width: 232,
        height: 195,
        borderRadius: 10,
        backgroundColor: '#f5f2ee'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 11
    },
    image: {
        width: 232,
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    content: {
        backgroundColor: 'transparent',
        paddingLeft: 12,
        position: 'relative',
        fontWeight: 'bold',
        lineHeight: 24,
    },

    name: {
        fontWeight: 'bold',
        width: 210,
        height: 44,
        color: '575457',
        marginTop: 8,
        fontSize: 14,
        lineHeight: 20,

    },
    category: {
        fontWeight: '300',
        fontSize: 12,
        marginTop: 6
    },
    countWrapper: {
        marginTop: 15,
        flexDirection: 'row',
    },
    count: {
        fontSize: 10,
        color: 'black',
        textAlign: 'center',
        lineHeight: 18,
    }
})

