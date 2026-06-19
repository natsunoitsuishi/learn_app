import { StyleSheet, ActivityIndicator } from 'react-native'

export default function Loading() {
  return <ActivityIndicator size="small" color="1f99b0" style={styles.loading} />
}

// ========== 仅修改下方样式 ==========
const styles = StyleSheet.create({
  loading: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    position: 'absolute',
    backgroundColor: '#fff',
  },
})
