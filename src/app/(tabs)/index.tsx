import {
  Text, View, StyleSheet, ScrollView, FlatList, Image, ListRenderItem, TouchableWithoutFeedback
} from 'react-native'
import Loading from '@/src/components/Loading'
import NetworkError from '@/src/components/NetworkError'
import useFetchData from '@/src/hooks/useReduceFetchData'
import { Link } from 'expo-router'
import {CourseItem} from "@/src/types";
import {SearchResponse} from "@/src/types";

export default function Index() {
  const { data, loading, error, onReload } = useFetchData<SearchResponse>('/')

  const recommendedCourses = data?.recommendedCourses ?? []
  const likesCourses = data?.likesCourses ?? []
  const introductoryCourses = data?.introductoryCourses ?? []

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <NetworkError title="" onReload={onReload} />
  }

  const renderItem: ListRenderItem<CourseItem> = ({ item, index }) => (
      <View
          style={[
            styles.course,
            index === 0 ? styles.first : null,
            index === recommendedCourses.length - 1 ? styles.last : null
          ]}
      >
        <Link asChild href={{ pathname: '/courses/[id]', params: { id: item.id } }}>
          <TouchableWithoutFeedback>
              <Image
                  source={require('../../assets/images/courses/reactCourse.png')}
                  style={styles.image}
              />
          </TouchableWithoutFeedback>
        </Link>

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.category}>{item.category.name}</Text>
          <View style={styles.userWrapper}>
            <Image
                source={require('../../assets/images/courses/reactCourse.png')}
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

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.slides}>
          <FlatList
              data={recommendedCourses}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
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
