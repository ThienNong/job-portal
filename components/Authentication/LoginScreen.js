import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, PixelRatio, ScrollView, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import global from '../global'
import signIn from '../../api/signIn'
import saveToken from '../../api/saveToken'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    checkData() {
        const { email, password } = this.state
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (email.trim().length == 0) {
            alert("Email không được bỏ trống!")
            return false
        }
        if (email.trim().length > 150) {
            alert("Độ dài email quá lớn!")
            return false
        }
        if (password.trim().length > 32) {
            alert("Độ dài mật khẩu không được vượt quá 32 ký tự!")
            return false
        }
        if (password.trim().length == 0) {
            alert("Mật khẩu không được bỏ trống!")
            return false
        }
        if (email.length < 6) {
            alert("Email không được nhỏ hơn 6 ký tự!")
            return false
        }
        if (password.length < 6) {
            alert("Mật khẩu không được nhỏ hơn 6 ký tự!")
            return false
        }
        if (!reg.test(email)) {
            alert("Định dạng email không đúng")
            return false
        }
        return true
    }

    login() {
        if (this.checkData()) {
            const { email, password } = this.state
            signIn(email, password)
                .then(res => {
                    global.user = res.user
                    if (global.reloadSavedJob)
                        global.reloadSavedJob()
                    if (global.reloadUserMenu)
                        global.reloadUserMenu()
                    saveToken(res.token)
                    Alert.alert(
                        'Thông báo',
                        'Đăng nhập thành công',
                        [
                            { text: 'OK', onPress: () => this.props.navigation.pop() }
                        ],
                        { cancelable: false }
                    )
                })
                .catch(
                    err => (alert('Đăng nhập thất bại!'))
                )
        }
    }

    render() {
        return (
            <SafeAreaView style={style.container}>
                <ScrollView style={style.container}>
                    <View style={style.top}>
                        <View style={style.loginContainer}>
                            <View style={style.textInputContainer}>
                                <Text style={style.inputText}>Email</Text>
                                <TextInput
                                    style={style.TextInput}
                                    placeholder='VD: Thiennong065@gmail.com'
                                    keyboardType='email-address'
                                    value={this.state.email}
                                    onChangeText={text => this.setState({ email: text })}
                                />
                            </View>
                            <View style={style.textInputContainer}>
                                <Text style={style.inputText}>Mật khẩu</Text>
                                <TextInput
                                    style={style.TextInput}
                                    placeholder='Mật khẩu phải từ 6 - 32 ký tự'
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={text => this.setState({ password: text })}
                                />
                            </View>
                            <TouchableOpacity
                                style={style.loginButton}
                                onPress={this.login.bind(this)}
                            >
                                <Icon
                                    name="sign-in"
                                    size={18}
                                    color="white"
                                />
                                <Text style={style.loginButtonText}>
                                    Đăng nhập
                                </Text>
                            </TouchableOpacity>
                            <Text
                                style={style.forgetPassword}
                                onPress={() => this.props.navigation.navigate('SignupScreen')}
                            >
                                Quên mật khẩu?
                            </Text>
                            <View style={style.underline}>
                            </View>
                            <View>
                                <Text style={style.notHaveAccountsText}>Chưa có tài khoản?</Text>
                                <TouchableOpacity
                                    style={style.signupButton}
                                    onPress={() => this.props.navigation.navigate('SignupScreen')}
                                >
                                    <Icon
                                        name="user-plus"
                                        size={18}
                                        color="red"
                                    />
                                    <Text style={style.signupButtonText}>
                                        Đăng ký
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

var style = StyleSheet.create({
    container: {
        flex: 1
    },
    textInputContainer: {
        marginHorizontal: 10,
        marginTop: 20
    },
    top: {
        flex: 9
    },
    loginContainer: {
        backgroundColor: 'white'
    },
    inputText: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    TextInput: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'gray',
        height: 40,
        paddingHorizontal: 10,
    },
    loginButton: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#DF0E16',
        borderRadius: 3,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonText: {
        marginLeft: 5,
        paddingVertical: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
    },
    forgetPassword: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginLeft: 10
    },
    underline: {
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: 'gray',
    },
    notHaveAccountsText: {
        marginTop: 10,
        marginHorizontal: 10
    },
    signupButton: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        borderWidth: 1 / PixelRatio.get(),
        borderRadius: 3,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupButtonText: {
        paddingVertical: 10,
        marginLeft: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
    }
})