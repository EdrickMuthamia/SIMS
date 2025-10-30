import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

export default function Terms() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TERMS & CONDITIONS</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('View Terms pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/info.png')} style={styles.icon} />
          <Text style={styles.buttonText}>View Terms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Accept Terms pressed')} activeOpacity={0.7}>
          <Image source={require('../../assets/icons/info.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Accept Terms</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    backgroundColor: '#FE005F',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFF00',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
