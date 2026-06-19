import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'

interface NetworkErrorProps {
  title: string
  onReload: () => void
}

export default function NetworkError(props: NetworkErrorProps) {
  const title = props.title || 'Network error'

  return (
    <View style={styles.containerCenter}>
      <SimpleLineIcons name={'drawer'} size={100} color={'#ddd'} />
      <Text>{title}</Text>
      <TouchableOpacity style={styles.reload} onPress={props.onReload}>
        <Text style={styles.label}>点击重新加载</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  reload: {
    marginTop: 10,
    backgroundColor: '#1f99b0',
    height: 40,
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  label: {
    color: '#fff',
    lineHeight: 40,
  },
})
