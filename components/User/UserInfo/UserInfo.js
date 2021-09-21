import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioForm from 'react-native-simple-radio-button';
import getUserDetail from '../../../api/getUserDetail';
import Global from '../../global';
import setUserInfo from '../../../api/setUserInfo';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sex: '',
      address: '',
      phone: '',
      currentJob: '',
      other: '',
    };
  }

  getUserData() {
    getUserDetail(Global.user.email).then((res) =>
      this.setState({
        name: res.name,
        sex: res.sex,
        address: res.address,
        phone: res.phone,
        currentJob: res.job,
        other: res.other,
      }),
    );
  }

  componentDidMount() {
    this.getUserData();
  }

  setUserData() {
    const {name, sex, address, phone, currentJob, other} = this.state;
    setUserInfo(Global.user.email, name, sex, address, phone, currentJob, other).then((res) => {
      if (res == 'SUCCESS') {
        Alert.alert(
          'Thông báo',
          'Cập nhật thông tin thành công',
          [{text: 'OK'}],
          {cancelable: false},
        );
        this.props.navigation.pop();
      } else if (res == 'FAIL') {
        Alert.alert(
          'Thông báo',
          'Không thể cập nhật thông tin!',
          [{text: 'OK'}],
          {cancelable: false},
        );
      }
    });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={style.container}>
          <Text style={style.textOnInput}>Họ và tên:</Text>
          <TextInput
            style={style.textInput}
            placeholder="VD: Nguyễn Văn A"
            value={this.state.name}
            onChangeText={(text) => this.setState({name: text})}
          />
          <Text style={style.textOnInput}>Giới tính:</Text>
          <RadioForm
            radio_props={[
              {label: 'Nam', value: 0},
              {label: 'Nữ', value: 1},
            ]}
            labelStyle={{marginRight: 10}}
            initial={0}
            formHorizontal={true}
            onPress={(value) => {
              this.setState({sex: value});
            }}
            buttonSize={15}
            selectedButtonColor={'#000'}
            buttonColor={'#000'}
            labelColor={'#000'}
          />
          <Text style={style.textOnInput}>Địa chỉ:</Text>
          <TextInput
            style={style.richTextInput}
            placeholder="VD: Số 208, Tổ 2, Đường Z115, Thành Phố Thái Nguyên, Tỉnh Thái Nguyên"
            multiline
            textAlignVertical="top"
            value={this.state.address}
            onChangeText={(text) => this.setState({address: text})}
          />
          <Text style={style.textOnInput}>Số điện thoại:</Text>
          <TextInput
            style={style.textInput}
            keyboardType="number-pad"
            value={this.state.phone}
            onChangeText={(text) => this.setState({phone: text})}
          />
          <Text style={style.textOnInput}>Công việc hiện tại:</Text>
          <TextInput
            style={style.richTextInput}
            placeholder="VD: Kỹ sư CNTT"
            multiline
            textAlignVertical="top"
            value={this.state.currentJob}
            onChangeText={(text) => this.setState({currentJob: text})}
          />
          <Text style={style.textOnInput}>Chú thích thêm:</Text>
          <TextInput
            style={style.richTextInput}
            numberOfLines={5}
            multiline
            textAlignVertical="top"
            value={this.state.other}
            onChangeText={(text) => this.setState({other: text})}
          />
          <TouchableOpacity
            style={style.button}
            onPress={this.setUserData.bind(this)}>
            <Icon name="pencil" size={18} color="white" />
            <Text style={style.buttonText}>Cập nhật thông tin</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
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
    marginBottom: 10,
  },
  richTextInput: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#EA1B21',
    borderRadius: 3,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#2D82C4',
    borderRadius: 3,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    paddingVertical: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
