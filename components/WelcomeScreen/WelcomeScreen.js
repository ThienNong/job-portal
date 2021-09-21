import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-navigation';

export default class WelcomeScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('MyTabNavigator');
    }, 5000);
  }

  render() {
    return (
      <SafeAreaView style={style.container}>
        <View style={style.top}></View>
        <View style={style.mid}>
          <Image
            style={{width: 200, height: 200}}
            source={require('../../img/logo.png')}
          />
        </View>
        <View style={style.bot}>
          <Text style={style.buttonText}>Phiên bản thử nghiệm</Text>
        </View>
      </SafeAreaView>
    );
  }
}

var style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  top: {
    flex: 30,
  },
  mid: {
    flex: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bot: {
    flex: 30,
    alignContent: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  buttonText: {
    paddingVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
});
