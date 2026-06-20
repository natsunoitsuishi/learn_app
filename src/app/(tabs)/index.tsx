import { StyleSheet, ScrollView } from 'react-native'
import Loading from '@/src/components/Loading'
import NetworkError from '@/src/components/NetworkError'
import useFetchData from '@/src/hooks/useReduceFetchData'
import {Response} from "@/src/types";
import Slides from "@/src/components/(tabs)/index/Slides";
import CoursesList from "@/src/components/(tabs)/index/CoursesList";

export default function Index() {
  const { data, loading, error, onReload } = useFetchData<Response>('/')

  const recommendedCourses = data?.recommendedCourses ?? []
  const likesCourses = data?.likesCourses ?? []
  const introductoryCourses = data?.introductoryCourses ?? []

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <NetworkError title="" onReload={onReload} />
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Slides course={recommendedCourses} />
        <CoursesList course={likesCourses} title='喜欢课程' />
        <CoursesList course={introductoryCourses} title='推荐课程' />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
})
