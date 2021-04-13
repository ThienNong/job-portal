import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import RadioForm from 'react-native-simple-radio-button'

export default class UserInfo extends Component {

    radio_props = [
        { label: 'param1', value: 0 },
        { label: 'param2', value: 1 }
    ]

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={style.container}>
                    <Text style={style.textOnInput}>Họ và tên:</Text>
                    <TextInput
                        style={style.textInput}
                        placeholder='VD: Nguyễn Văn A'
                    />
                    <Text style={style.textOnInput}>Giới tính:</Text>
                    <RadioForm
                        radio_props={[
                            { label: 'Nam', value: 'Nam' },
                            { label: 'Nữ', value: 'Nữ' }
                        ]}
                        labelStyle={{marginRight: 10}}
                        initial={0}
                        formHorizontal={true}
                        onPress={(value) => {}}
                        buttonSize={15}
                        selectedButtonColor={'#000'}
                        buttonColor={'#000'}
                        labelColor={'#000'}
                    />
                    <Text style={style.textOnInput}>Địa chỉ:</Text>
                    <TextInput
                        style={style.richTextInput}
                        placeholder='VD: Số 208, Tổ 2, Đường Z115, Thành Phố Thái Nguyên, Tỉnh Thái Nguyên'
                        multiline
                        textAlignVertical='top'
                    />
                    <Text style={style.textOnInput}>Số điện thoại:</Text>
                    <TextInput
                        style={style.textInput}
                        keyboardType='number-pad'
                    />
                    <Text style={style.textOnInput}>Công việc hiện tại:</Text>
                    <TextInput
                        style={style.richTextInput}
                        placeholder='VD: Kỹ sư CNTT'
                        multiline
                        textAlignVertical='top'
                    />
                    <Text style={style.textOnInput}>Chú thích thêm:</Text>
                    <TextInput
                        style={style.richTextInput}
                        numberOfLines={5}
                        multiline
                        textAlignVertical='top'
                    />
                    <TouchableOpacity
                        style={style.button}
                    >
                        <Icon
                            name="pencil"
                            size={18}
                            color="white"
                        />
                        <Text style={style.buttonText}>
                            Cập nhật thông tin
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.button2}
                    >
                        <Icon
                            name="repeat"
                            size={18}
                            color="white"
                        />
                        <Text style={style.buttonText}>
                            Đổi mật khẩu
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white'
    },
    textOnInput: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'gray',
        height: 40,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    richTextInput: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'gray',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    button: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#EA1B21',
        borderRadius: 3,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button2: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#2D82C4',
        borderRadius: 3,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        paddingVertical: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    }
})