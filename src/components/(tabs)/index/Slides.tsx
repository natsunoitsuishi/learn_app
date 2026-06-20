import {
    Text, View, StyleSheet, FlatList, Image, ListRenderItem, TouchableWithoutFeedback
} from 'react-native'
import { Link } from 'expo-router'
import {CourseItem} from "@/src/types";

type coursesType = {
    course: CourseItem[]
}
export default function Slides ({course}: coursesType) {

    const renderItem: ListRenderItem<CourseItem> = ({ item, index }) => {
        return (
            <View
                style={[
                    styles.course,
                    index === 0 ? styles.first : null,
                    index === course.length - 1 ? styles.last : null
                ]}
            >
                <Link asChild href={{pathname: '/teachers/[id]', params: {id: item.id}}}>
                    <TouchableWithoutFeedback>
                        <Image source={{
                            uri: item.image?.replace(
                                'http://localhost:3000',
                                process.env.EXPO_PUBLIC_API_URL || ''
                                ) || ''
                        }}
                            style={styles.image}
                        />
                    </TouchableWithoutFeedback>
                </Link>

                <View style={styles.content}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.category}>{item.category.name}</Text>
                    <View style={styles.userWrapper}>
                        <Image
                            source={{
                                uri: item.user.avatar?.replace(
                                    'http://localhost:3000',
                                    process.env.EXPO_PUBLIC_API_URL || ''
                                ) || ''
                            }}
                            style={styles.avatar}
                        />
                        <View style={styles.userInfo}>
                            <Text style={styles.nickname}>{item.user.nickname}</Text>
                            <Text style={styles.company} numberOfLines={2}>{item.user.company}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <>
            <View style={styles.slides}>
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
    slides: {
        marginTop: 10,
        marginBottom: 16
    },
    first: {
        marginLeft: 10
    },
    last: {
        marginRight: 10
    },
    course: {
        marginRight: 8
    },
    image: {
        width: 320,
        height: 145,
        borderRadius: 10
    },
    content: {
        paddingLeft: 10
    },

    name: {
        fontWeight: 'bold',
        width: 305,
        marginTop: 7,
        fontSize: 14
    },
    category: {
        fontSize: 12,
        marginTop: 6
    },
    userWrapper: {
        marginTop: 15,
        flexDirection: 'row',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    userInfo: {
        marginLeft: 10
    },
    nickname: {
        fontSize: 11
    },
    company: {
        width: 100,
        marginTop: 2,
        fontSize: 10,
        color: '#777'
    }
})

