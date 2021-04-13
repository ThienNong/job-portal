import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, PixelRatio, FlatList } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Picker } from '@react-native-picker/picker'
import checkLogin from '../../api/checkLogin'
import getToken from '../../api/getToken'
import global from '../global'

export default class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            jobsList: [],
            carierList: [],
            provinceList: [],
            refresh: false,
            jobSearchText: '',
            selectedCareer: '',
            selectedProvince: ''
        }
    }

    _isMounted = false

    getProvince() {
        fetch('https://jobportalthiennong.000webhostapp.com/webservice/getProvince.php')
            .then((response) => response.json())
            .then((responseJson) => {
                if (this._isMounted)
                {
                    this.setState({
                        provinceList: responseJson
                    })
                }
            })
    }

    getNewJob() {
        this.setState({
            refresh: true
        })
        fetch('https://jobportalthiennong.000webhostapp.com/webservice/getNewJobs.php')
            .then((response) => response.json())
            .then((responseJson) => {
                if (this._isMounted)
                {
                    this.setState({
                        jobsList: responseJson,
                        refresh: false
                    })
                }
            })
    }

    getCarrier() {
        fetch("https://jobportalthiennong.000webhostapp.com/webservice/getCarrier.php")
            .then((response) => response.json())
            .then((responseJson) => {
                if (this._isMounted) {
                    this.setState({
                        carierList: responseJson
                    })
                }
            })
    }

    UNSAFE_componentWillUnmount() {
        this._isMounted = false;
    } 

    componentDidMount() {
        this._isMounted = true
        getToken()
            .then(token => checkLogin(token))
            .then(res => {
                global.user = res.user
                if (global.reloadSavedJob)
                    global.reloadSavedJob()
                if (global.reloadUserMenu)
                    global.reloadUserMenu()
            })
            .catch(err => { console.log(err) })
        this.getNewJob()
        this.getCarrier()
        this.getProvince()
    }

    render() {
        return (
            <SafeAreaView style={style.container}>
                <FlatList
                    ListHeaderComponent={
                        <View style={style.container}>
                            <View style={style.search}>
                                <View style={style.textInputContainer}>
                                    <Icon
                                        name="pencil"
                                        size={15}
                                        color="black"
                                    />
                                    <TextInput style={style.searchTextInput}
                                        placeholder='Nhập từ khoá'
                                        value={this.state.jobSearchText}
                                        onChangeText={(value) => this.setState({ jobSearchText: value })}
                                    />
                                </View>
                                <View style={style.pickerContainer}>
                                    <Icon
                                        name="gear"
                                        size={15}
                                        color="black"
                                    />
                                    <Picker
                                        useNativeAndroidPickerStyle={false}
                                        style={style.picker}
                                        selectedValue={this.state.selectedCareer}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ selectedCareer: itemValue })}
                                    >
                                        <Picker.Item label="Chọn ngành nghề" value="" />
                                        {this.state.carierList.map((item, key) => (
                                            <Picker.Item label={item.name} value={item.id} key={key} />)
                                        )}
                                    </Picker>
                                </View>
                                <View style={style.pickerContainer}>
                                    <Icon
                                        name="location-arrow"
                                        size={15}
                                        color="black"
                                    />
                                    <Picker
                                        useNativeAndroidPickerStyle={false}
                                        style={style.picker}
                                        selectedValue={this.state.selectedProvince}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ selectedProvince: itemValue })}
                                    >
                                        <Picker.Item label="Chọn khu vực" value="" />
                                        {this.state.provinceList.map((item, key) => (
                                            <Picker.Item label={item.name} value={item.id} key={key} />)
                                        )}
                                    </Picker>
                                </View>
                                <TouchableOpacity
                                    style={style.button}
                                    onPress={() => this.props.navigation.navigate('SearchResult', {
                                        SearchText: this.state.jobSearchText.toString(),
                                        province: this.state.selectedProvince.toString(),
                                        carrier: this.state.selectedCareer.toString()
                                    })}
                                >
                                    <Icon
                                        name="search"
                                        size={18}
                                        color="white"
                                    />
                                    <Text style={style.buttonText}>
                                        Tìm kiếm công việc
                                    </Text>
                                </TouchableOpacity>
                                <View style={style.underlineView}></View>
                                <Text style={style.recruitersText}>Bạn là nhà tuyển dụng?</Text>
                                <TouchableOpacity
                                    style={style.button}
                                >
                                    <Icon
                                        name="users"
                                        size={18}
                                        color="white"
                                    />
                                    <Text style={style.buttonText}>
                                        Giao diện nhà tuyển dụng
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={style.newJobsContainer}>
                                <View style={style.newJobsHeader}>
                                    <Text style={style.newJobsHeaderText}>Việc làm mới</Text>
                                </View>
                            </View>
                        </View>
                    }
                    onRefresh={() => { this.getNewJob() }}
                    refreshing={this.state.refresh}
                    data={this.state.jobsList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style={style.jobComponent}
                            onPress={() => this.props.navigation.navigate('JobDetail', {
                                jobID: item.id
                            })}
                        >
                            <Text
                                style={style.jobComponentTitle}
                                numberOfLines={1}
                            >
                                {item.title}
                            </Text>
                            <Text
                                style={style.jobComponentAddress}
                                numberOfLines={1}
                            >
                                {item.address}
                            </Text>
                            <View style={style.placeSalaryHolder}>
                                <View style={style.textWithIcon}>
                                    <Icon
                                        name="map-marker"
                                        size={14}
                                        color="#757575"
                                    />
                                    <Text
                                        style={style.smallTextInFlatComponent}
                                        numberOfLines={1}
                                    >
                                        {item.province}
                                    </Text>
                                </View>
                                <View style={style.textWithIcon}>
                                    <Icon
                                        name="dollar"
                                        size={14}
                                        color="#757575"
                                    />
                                    <Text
                                        style={style.smallTextInFlatComponent}
                                        numberOfLines={1}
                                    >
                                        {item.salary}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </SafeAreaView >
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    search: {
        backgroundColor: 'white',
        padding: 10
    },
    textInputContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginTop: 10,
        borderWidth: 1 / PixelRatio.get(),
        alignItems: 'center',
        borderRadius: 3
    },
    searchTextInput: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flex: 1,
        fontSize: 16
    },
    pickerContainer: {
        paddingLeft: 10,
        marginTop: 10,
        borderWidth: 1 / PixelRatio.get(),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 3,
        fontSize: 10
    },
    picker: {
        width: "100%",
        height: 38,
        fontFamily: 'Arial'
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
        marginLeft: 10,
        paddingVertical: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
    },
    buttonContainer: {
        marginTop: 10,
        flex: 1,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonReg: {
        backgroundColor: 'red',
        flex: 0.49,
        flexDirection: 'row',
        borderRadius: 3,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLogin: {
        backgroundColor: 'green',
        flex: 0.49,
        flexDirection: 'row',
        borderRadius: 3,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    underlineView: {
        marginTop: 10,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: 'gray',
    },
    recruitersText: {
        marginTop: 10
    },
    newJobsContainer: {
        flex: 1,
        marginTop: 10
    },
    newJobsHeader: {
        paddingVertical: 10,
        backgroundColor: '#FAFAFA',
        borderBottomColor: '#757575',
        borderBottomWidth: 1 / PixelRatio.get()
    },
    newJobsHeaderText: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'blue',
        fontSize: 12
    },
    jobComponent: {
        backgroundColor: '#FFF',
        paddingLeft: 10,
        paddingRight: 30,
        paddingVertical: 10,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#757575'
    },
    jobComponentTitle: {
        fontWeight: 'bold',
    },
    jobComponentAddress: {
        marginTop: 5,
        color: '#757575'
    },
    placeSalaryHolder: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
    },
    textWithIcon: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    smallTextInFlatComponent: {
        fontSize: 13,
        marginLeft: 5,
        color: '#757575',
        paddingRight: 10
    }
})