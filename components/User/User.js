import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import global from '../global'
import saveToken from '../../api/saveToken'

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user
        }
    }

    signOut() {
        global.user = null
        if (global.reloadSavedJob)
            global.reloadSavedJob()
        if (global.reloadUserMenu)
            global.reloadUserMenu()
        saveToken('')
        Alert.alert(
            'Thông báo',
            'Đăng xuất thành công',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <SafeAreaView style={style.container}>
                <View style={style.user}>
                    <Text>Xin chào</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.state.user ? this.state.user.name : 'NULL'}</Text>
                    <Text>{ this.state.user.email }</Text>
                    <View style={style.buttonContainer}>
                        <TouchableOpacity
                            style={style.regButton}
                            onPress={this.signOut.bind(this)}
                        >
                            <Text style={style.buttonText}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    user: {
        margin: 10,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
    },
    buttonContainer: {
        marginTop: 10,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logButton: {
        marginLeft: 10,
        marginRight: 5,
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    regButton: {
        marginLeft: 5,
        marginRight: 10,
        flex: 1,
        backgroundColor: '#2D82C4',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        paddingVertical: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
    }
})