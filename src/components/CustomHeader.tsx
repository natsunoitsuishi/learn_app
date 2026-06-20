// components/CustomHeader.tsx
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {Link} from "expo-router";

interface CustomHeaderProps {
    title?: string
    showSearch?: boolean
    onSearch?: (text: string) => void
    rightComponent?: React.ReactNode
}

export default function CustomHeader({
                                         title = '首页',
                                         showSearch = false,
                                         onSearch,
                                         rightComponent
                                     }: CustomHeaderProps) {
    const [isSearching, setIsSearching] = useState(false)
    const [searchText, setSearchText] = useState('')

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <Link href="/articles" asChild>
                    <TouchableOpacity style={styles.iconBtn}>
                        <View style={styles.left}>
                                <Ionicons name="notifications-outline" size={24} color="#667eea" />
                                <View style={styles.badge} />
                        </View>
                    </TouchableOpacity>
                </Link>

                {!isSearching && (
                        <View style={styles.logoContainer}>
                            <Ionicons name="book-outline" size={28} color="#667eea" />
                            <Text style={styles.logoText}>{title}</Text>
                        </View>
                    )
                }
                {isSearching ? (
                    <View style={styles.searchContainer}>
                        <Ionicons name="search-outline" size={20} color="#999" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="搜索课程..."
                            placeholderTextColor="#999"
                            value={searchText}
                            onChangeText={(text) => {
                                setSearchText(text)
                                onSearch?.(text)
                            }}
                            autoFocus
                        />
                        <TouchableOpacity onPress={() => setIsSearching(false)}>
                            <Text style={styles.cancelBtn}>取消</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <View style={styles.right}>
                            {showSearch && (
                                <TouchableOpacity
                                    style={styles.iconBtn}
                                    onPress={() => setIsSearching(true)}
                                >
                                    <Ionicons name="search-outline" size={24} color="#667eea" />
                                </TouchableOpacity>
                            )}
                            {rightComponent}
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#ffffff'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#ffffff'
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backBtn: {
        padding: 4,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
        marginLeft: 8,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBtn: {
        marginLeft: 16,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ff6b6b',
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginHorizontal: 12,
        height: 40,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#1a1a1a',
    },
    cancelBtn: {
        color: '#667eea',
        marginLeft: 8,
        fontSize: 14,
    },
})