import React, {Component} from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

class NeedLogged extends Component {
    render() {
        return (
            <SafeAreaView style={style.container}>
                <Text>Bạn chưa đăng nhập!</Text>
                <TouchableOpacity
                    style={style.button}
                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                >
                    <Text style={style.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default withNavigation(NeedLogged)

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
        flexDirection: 'row',
        marginHorizontal: 0,
        marginTop: 10,
        backgroundColor: '#2D82C4',
        borderRadius: 3,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF'
    }
})

