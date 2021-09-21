import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EmployeeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={style.container}>
        <TouchableOpacity
          style={style.button}
          onPress={() => this.props.navigation.navigate('AddJob')}>
          <Icon name="users" size={18} color="white" />
          <Text style={style.buttonText}>Đăng tin tuyển dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button}
          onPress={() => this.props.navigation.navigate('YourJobs')}>
          <Icon name="users" size={18} color="white" />
          <Text style={style.buttonText}>Công việc của bạn</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'green',
    borderRadius: 3,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
});
