import { StyleSheet, ScrollView } from 'react-native'
import Loading from '@/src/components/Loading'
import NetworkError from '@/src/components/NetworkError'
import useFetchData from '@/src/hooks/useReduceFetchData'
import {Response} from "@/src/types";
import Slides from "@/src/components/(tabs)/index/Slides";
import CoursesList from "@/src/components/(tabs)/index/CoursesList";
import {RefreshControl} from "react-native";

export default function Index() {
  const { data, loading, error, refresh, onReload, onRefresh, setData } = useFetchData<Response>('/')

  const recommendedCourses = data?.recommendedCourses ?? []
  const likesCourses = data?.likesCourses ?? []
  const introductoryCourses = data?.introductoryCourses ?? []

  const renderContent = () => {

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <NetworkError title="" onReload={onReload} />
    }

    return (
        <>
          <Slides course={recommendedCourses} />
          <CoursesList course={likesCourses} title='人气视频课程' />
          <CoursesList course={introductoryCourses} title='入门推荐课程' />
        </>
    )
  }

  return (
    <>
      <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainerStyle}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              tintColor={'#1f99b0'}
            />
          }
      >
        { renderContent() }
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  contentContainerStyle: {
    minHeight: '80%'
  }
})
