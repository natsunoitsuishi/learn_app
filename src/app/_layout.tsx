// app/_layout.tsx
import { Stack } from 'expo-router'
import CustomHeader from '@/src/components/CustomHeader'

const customOption = {
    headerTitleStyle: {
        fontWeight: 'bold' as const,
    },
    headerTitleAlign: 'center' as const,
} as const

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

        <Stack.Screen name="articles/index" options={{ ...customOption, title: '通知' }} />
        <Stack.Screen name="articles/[id]"  options={{ ...customOption, title: '通知详情' }} />

        <Stack.Screen name="setting/[uri]"
            options={({ route }) => (
                { ...customOption, title: (route.params as { title?: string })?.title }
            )}
        />
        <Stack.Screen name="setting/index"  options={{ ...customOption, title: '设置' }} />

    </Stack>
  )
}

