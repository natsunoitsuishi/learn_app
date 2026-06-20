import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'

export default function TabsLayout() {
    return (
        <Tabs
            // 全局 Tab 样式配置
            screenOptions={{
                headerShown: false, // Tab 页面默认隐藏顶部导航栏（由根Stack控制）
                tabBarActiveTintColor: '#007AFF', // 选中颜色
                tabBarInactiveTintColor: '#666', // 未选中颜色
                tabBarStyle: {
                    height: Platform.OS === 'ios' ? 80 : 60,
                    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
                    backgroundColor: '#fff',
                    borderTopColor: '#eee',
                },
            }}
        >
            {/* 第一个 Tab：首页（对应 (tabs)/index.tsx 你的课程搜索页） */}
            <Tabs.Screen
                name="index"
                options={{
                    title: '发现',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="video"
                options={{
                    title: '视频课程',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="mine"
                options={{
                    title: '我的',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}
