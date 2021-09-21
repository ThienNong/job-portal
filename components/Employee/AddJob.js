import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  PixelRatio,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import addJob from '../../api/addJob';
import global from '../global';

export default class AddJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carierList: [],
      provinceList: [],
      jobTitle: '',
      selectedCareer: '',
      address: '',
      selectedProvince: '',
      salary: '',
      expJob: '',
      jobDescription: '',
      jobRequirement: '',
      user: '',
    };
  }

  checkData() {
    const {jobTitle, address, salary, expJob} = this.state;

    if (jobTitle.trim().length == 0) {
      Alert.alert('','Bạn chưa nhập tiêu đề!');
      return false;
    }
    if (jobTitle.trim().length > 150) {
      Alert.alert('','Độ dài tiêu đề quá lớn! Độ dài phải dưới 150 ký tự!');
      return false;
    }
    if (address.trim().length == 0) {
      Alert.alert('','Bạn chưa địa chỉ!');
      return false;
    }
    if (address.trim().length > 500) {
      Alert.alert('','Độ dài địa chỉ quá lớn! Độ dài phải dưới 500 ký tự!');
      return false;
    }
    if (jobTitle.trim().length == 0) {
      Alert.alert('','Bạn chưa nhập tiêu đề!');
      return false;
    }
    if (salary.trim().length > 200) {
      Alert.alert('','Độ dài mức lương quá lớn! Độ dài phải dưới 200 ký tự!');
      return false;
    }
    if (expJob.trim().length > 500) {
      Alert.alert('','Độ dài kinh nghiệm quá lớn! Độ dài phải dưới 500 ký tự!');
      return false;
    }
    return true;
  }

  getCarrier() {
    fetch('https://chovieclam.net/api/getCarrier.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          carierList: responseJson,
        });
      });
  }

  getProvince() {
    fetch('https://chovieclam.net/api/getProvince.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          provinceList: responseJson,
        });
      });
  }

  AddNewJob() {
    if (!this.checkData()){
        return;
    }

    const {
      jobTitle,
      selectedCareer,
      address,
      selectedProvince,
      salary,
      expJob,
      jobDescription,
      jobRequirement,
      user,
    } = this.state;

    addJob(
      jobTitle,
      selectedCareer,
      address,
      selectedProvince,
      salary,
      expJob,
      jobDescription,
      jobRequirement,
      user.email,
    ).then((res) => {
      if (res == 'SUCCESS') {
        Alert.alert(
          'Thông báo',
          'Thêm tin tuyển dụng thành công',
          [{text: 'OK'}],
          {cancelable: false},
        );
        this.props.navigation.pop();
      } else if (res == 'FAIL') {
        Alert.alert(
          'Thông báo',
          'Không thể thêm tin tuyển dụng!',
          [{text: 'OK'}],
          {cancelable: false},
        );
      }
    });
  }

  componentDidMount() {
    this.getCarrier();
    this.getProvince();
    this.setState({
      user: global.user,
    });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={style.container}>
          <Text style={style.textOnInput}>Tiêu đề:</Text>
          <TextInput
            style={style.textInput}
            placeholder="VD: Tuyển nhân viên"
            value={this.state.jobTitle}
            onChangeText={(text) => this.setState({jobTitle: text})}
          />
          <Text style={style.textOnInput}>Ngành nghề:</Text>
          <View style={style.pickerContainer}>
            <Icon name="gear" size={15} color="black" />
            <Picker
              useNativeAndroidPickerStyle={false}
              style={style.picker}
              selectedValue={this.state.selectedCareer}
              onValueChange={(itemValue) =>
                this.setState({selectedCareer: itemValue})
              }>
              {this.state.carierList.map((item, key) => (
                <Picker.Item label={item.name} value={item.id} key={key} />
              ))}
            </Picker>
          </View>
          <Text style={style.textOnInput}>Địa chỉ:</Text>
          <TextInput
            style={style.richTextInput}
            placeholder="VD: Số 208, Tổ 2, Đường Z115, Thành Phố Thái Nguyên, Tỉnh Thái Nguyên"
            multiline
            textAlignVertical="top"
            value={this.state.address}
            onChangeText={(text) => this.setState({address: text})}
          />
          <Text style={style.textOnInput}>Tỉnh thành:</Text>
          <View style={style.pickerContainer}>
            <Icon name="location-arrow" size={15} color="black" />
            <Picker
              useNativeAndroidPickerStyle={false}
              style={style.picker}
              selectedValue={this.state.selectedProvince}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({selectedProvince: itemValue})
              }>
              {this.state.provinceList.map((item, key) => (
                <Picker.Item label={item.name} value={item.id} key={key} />
              ))}
            </Picker>
          </View>
          <Text style={style.textOnInput}>Lương:</Text>
          <TextInput
            style={style.textInput}
            value={this.state.salary}
            onChangeText={(text) => this.setState({salary: text})}
          />
          <Text style={style.textOnInput}>Yêu cầu kinh nghiệm:</Text>
          <TextInput
            style={style.textInput}
            value={this.state.expJob}
            onChangeText={(text) => this.setState({expJob: text})}
          />
          <Text style={style.textOnInput}>Mô tả công việc:</Text>
          <TextInput
            style={style.richTextInput}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={this.state.jobDescription}
            onChangeText={(text) => this.setState({jobDescription: text})}
          />
          <Text style={style.textOnInput}>Yêu cầu công việc:</Text>
          <TextInput
            style={style.richTextInput}
            numberOfLines={5}
            multiline
            textAlignVertical="top"
            value={this.state.jobRequirement}
            onChangeText={(text) => this.setState({jobRequirement: text})}
          />
          <TouchableOpacity
            style={style.button}
            onPress={() => {this.AddNewJob()}}>
            <Icon name="pencil" size={18} color="white" />
            <Text style={style.buttonText}>Đăng tin tuyển dụng</Text>
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
  pickerContainer: {
    paddingLeft: 10,
    marginBottom: 10,
    borderWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    fontSize: 10,
  },
  picker: {
    width: '100%',
    height: 38,
    fontFamily: 'Arial',
  },
});
