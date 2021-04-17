import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, PixelRatio, Alert } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import register from '../../api/register'

export default class WelcomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repassword: '',
            name: '',
            phone: ''
        }
    }

    checkData() {
        const { email, password, repassword, name, phone } = this.state
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
            alert("Định dạng email không đúng!")
            return false
        }
        if (password !== repassword) {
            alert("Xác nhận lại mật khẩu không đúng!")
            return false
        }
        if (name.trim().length == 0) {
            alert("Bạn chưa nhập họ và tên!")
            return false
        }
        if (phone.trim().length == 0) {
            alert("Bạn chưa nhập số điện thoại!")
            return false
        }
        if (phone.trim().length != 11 && phone.trim().length != 10) {
            alert("Số điện thoại không hợp lệ")
            return false
        }
        return true
    }

    registerUser() {
        if (this.checkData()) {
            const { email, password, name, phone } = this.state
            register(email, password, name, phone).then(res => {
                if (res === 'SUCCESS') {
                    this.onSuccess()
                }
                else {
                    this.onFail();
                }
            })
        }
    }

    onSuccess() {
        Alert.alert(
            'Thông báo',
            'Đăng ký thành công',
            [
                { text: 'OK', onPress: () => this.props.navigation.pop() }
            ],
            { cancelable: false }
        )
    }

    onFail() {
        Alert.alert(
            'Thông báo',
            'Email này đã được sử dụng',
            [
                { text: 'OK', onPress: this.removeEmail.bind(this) }
            ],
            { cancelable: false }
        )
    }

    removeEmail() {
        this.setState({
            email: ''
        })
    }

    render() {
        return (
            <SafeAreaView style={style.container}>
                <ScrollView style={style.container}>
                    <View style={style.header}>
                        <Text style={style.headerText}>Thông tin đăng ký</Text>
                    </View>
                    <View style={style.textInputContainer}>
                        <Text style={style.inputText}>Email<Text style={style.starChar}>  *</Text></Text>
                        <TextInput
                            style={style.TextInput}
                            keyboardType='email-address'
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <Text style={style.warningText}><Text style={style.warningTextBold}>Lưu ý: </Text>Vui lòng nhập đúng thông tin email để nhà tuyển dụng có thể liên hệ với bạn</Text>
                    </View>
                    <View style={style.textInputContainer}>
                        <Text style={style.inputText}>Mật khẩu<Text style={style.starChar}>  *</Text></Text>
                        <TextInput
                            style={style.TextInput}
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                        />
                        <Text style={style.warningText}><Text style={style.warningTextBold}>Lưu ý: </Text>Mật khẩu phải từ 6 - 32 ký tự</Text>
                    </View>
                    <View style={style.textInputContainer}>
                        <Text style={style.inputText}>Xác nhận lại mật khẩu<Text style={style.starChar}>  *</Text></Text>
                        <TextInput
                            style={style.TextInput}
                            secureTextEntry={true}
                            value={this.state.repassword}
                            onChangeText={text => this.setState({ repassword: text })}
                        />
                    </View>
                    <View style={style.underlineView}></View>
                    <View style={style.header}>
                        <Text style={style.headerText}>Thông tin cá nhân</Text>
                    </View>
                    <View style={style.textInputContainer}>
                        <Text style={style.inputText}>Họ và tên<Text style={style.starChar}>  *</Text></Text>
                        <TextInput
                            style={style.TextInput}
                            value={this.state.name}
                            onChangeText={text => this.setState({ name: text })}
                        />
                    </View>
                    <View style={style.textInputContainer}>
                        <Text style={style.inputText}>Số điện thoại<Text style={style.starChar}>  *</Text></Text>
                        <TextInput
                            style={style.TextInput}
                            keyboardType='phone-pad'
                            value={this.state.phone}
                            onChangeText={text => this.setState({ phone: text })}
                        />
                        <Text style={style.warningText}><Text style={style.warningTextBold}>Lưu ý: </Text>Vui lòng nhập đúng thông tin số điện thoại để nhà tuyển dụng có thể liên hệ với bạn</Text>
                    </View>
                    <View style={style.underlineView}></View>
                    <TouchableOpacity
                        style={style.signupButton}
                        onPress={this.registerUser.bind(this)}>
                        <Icon
                            name="user-plus"
                            size={18}
                            color="white"
                        />
                        <Text style={style.signupButtonText}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        marginHorizontal: 10,
        marginTop: 10
    },
    headerText: {
        color: '#2D82C3',
        fontSize: 16
    },
    starChar: {
        color: 'red',
        fontSize: 16
    },
    textInputContainer: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    inputText: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    TextInput: {
        borderWidth: 1 / PixelRatio.get(),
        borderRadius: 3,
        borderColor: 'gray',
        height: 40,
        paddingHorizontal: 10,
        marginBottom: 5,
        backgroundColor: 'white'
    },
    warningText: {
        fontSize: 12
    },
    warningTextBold: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    underlineView: {
        marginTop: 20,
        marginHorizontal: 10,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: 'gray',
    },
    signupButton: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#DF0E16',
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
        color: 'white',
    }
})