// app/teacher/[id].tsx
import { View, Text, StyleSheet, Button, Platform } from 'react-native'
import { useLocalSearchParams, router, Stack } from 'expo-router'

export default function TeacherDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
          title: '教师详情',
          headerShown: true,
          animation: 'slide_from_bottom',
          ...Platform.select({
            android: {
              presentation: 'modal',
            },
          }),
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>教师详情</Text>
        <Text style={styles.id}>ID: {id}</Text>
        <Button
          title="关闭"
          onPress={() => {
              router.dismiss()
          }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  id: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
})
