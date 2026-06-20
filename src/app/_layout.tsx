// app/_layout.tsx
import { Stack } from 'expo-router'
import CustomHeader from '@/src/components/CustomHeader'

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: true}}>
        <Stack.Screen name="(tabs)"
            options={{
                headerShown: true,
                header: () => <CustomHeader
                    title="Apple" showSearch={true}
                    onSearch={(text) => {
                        console.log('搜索:', text)
                    }} />
            }}
        />

        <Stack.Screen name="articles/index"
            options={{
                title: '通知',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
            }}
        />

        <Stack.Screen name="articles/[id]"
            options={{
                title: '通知详情',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
            }}
        />


    </Stack>
  )
}
