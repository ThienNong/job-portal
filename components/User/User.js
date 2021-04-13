import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, PixelRatio, ScrollView } from 'react-native'
import global from '../global'
import Icon from 'react-native-vector-icons/FontAwesome'
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
                <ScrollView>
                    <View style={style.user}>
                        <Text>Xin chào</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.state.user ? this.state.user.name : 'NULL'}</Text>
                        <Text>{this.state.user.email}</Text>
                        <View style={style.buttonContainer}>
                            <TouchableOpacity
                                style={style.regButton}
                                onPress={this.signOut.bind(this)}
                            >
                                <Text style={style.buttonText}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.buttonList}>
                        <Text style={style.buttonListHeaderText}>Hồ sơ của bạn</Text>
                        <TouchableOpacity
                            style={style.button}
                            onPress={() => this.props.navigation.navigate('UserInfo')}
                        >
                            <Icon
                                name="address-book"
                                size={18}
                            />
                            <Text style={style.buttonText2}>
                                Thông tin cá nhân
                         </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.button}
                        >
                            <Icon
                                name="file-text"
                                size={18}
                            />
                            <Text style={style.buttonText2}>
                                CV của bạn <Text style={{ color: 'red' }}>(Chưa khả dụng)</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttonList}>
                        <Text style={style.buttonListHeaderText}>Công việc của bạn</Text>
                        <TouchableOpacity
                            style={style.button}
                            onPress={() => this.props.navigation.navigate('SavedJob')}
                        >
                            <Icon
                                name="star"
                                size={18}
                            />
                            <Text style={style.buttonText2}>
                                Công việc đã lưu
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.button}
                            onPress={() => this.props.navigation.navigate('ApplyJob')}
                        >
                            <Icon
                                name="th-list"
                                size={18}
                            />
                            <Text style={style.buttonText2}>
                                Việc làm đã ứng tuyển
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttonList}>
                        <Text style={style.buttonListHeaderText}>Khác</Text>
                        <TouchableOpacity
                            style={style.button}
                        >
                            <Icon
                                name="gear"
                                size={18}
                            />
                            <Text style={style.buttonText2}>
                                Cài đặt
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.button}
                        >
                            <Icon
                                name="info-circle"
                                size={18}
                            />
                            <Text style={style.buttonText2}>
                                Phiên bản phần mềm: 1.0
                        </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    user: {
        marginTop: 10,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderTopWidth: 1
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
    },
    buttonList: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    buttonListHeaderText: {
        fontWeight: 'bold',
        color: '#2D82C4'
    },
    button: {
        flexDirection: 'row',
        marginHorizontal: 0,
        marginTop: 10,
        paddingTop: 10,
        borderRadius: 3,
        alignItems: 'center'
    },
    buttonText2: {
        marginLeft: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})