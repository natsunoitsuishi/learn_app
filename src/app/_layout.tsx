// app/_layout.tsx
import { Stack } from 'expo-router'
import { Platform } from 'react-native'
import CustomHeader from '@/src/components/CustomHeader'

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
          name="(tabs)"
          options={{
              headerShown: true,
              header: () => <CustomHeader
                  title="Apple"
                  showSearch={true}
                  onSearch={(text) => {
                      console.log('搜索:', text)
                  }} />
          }}
      />
    </Stack>
  )
}
