import React, { Component } from 'react'
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Entypo'
import { Text, View, ScrollView, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native'

export default class JobDetailScreen extends Component {
    constructor(props) {
        super(props),
            this.state = {
                id: '',
                jobData: []
            }
    }

    getJobDetail(jobID) {
        fetch("http://192.168.20.102:8080/WebService/getJobDetail.php?id=" + jobID + "")
            .then((response) => response.json())
            .then((responseJson) => { 
                this.setState({
                    jobData: responseJson
                })
            })
            .catch((e) => { console.log(e) })
    }

    componentDidMount() {
        var jobID = this.props.navigation.getParam('jobID')
        this.getJobDetail(jobID)
    }

    render() {
        return (
            <SafeAreaView style={style.container}>
                <ScrollView style={style.container}>
                    <View style={style.headerJob}>
                        <Text style={style.headerJobName}>{this.state.jobData.title}</Text>
                        <Text style={style.headerJobPlace}>{this.state.jobData.address}</Text>
                    </View>
                    <View style={style.jobInfo}>
                        <View style={style.textWithIcon}>
                            <Icon2
                                name="classic-computer"
                                size={15}
                                color="#757575"
                            />
                            <Text style={style.textWithIconText}>
                                <Text style={{ fontWeight: 'bold' }}>Ngành nghề: </Text>{this.state.jobData.type}
                            </Text>
                        </View>
                        <View style={style.textWithIcon}>
                            <Icon2
                                name="location-pin"
                                size={15}
                                color="#757575"
                            />
                            <Text style={style.textWithIconText}>
                                <Text style={{ fontWeight: 'bold' }}>Khu vực: </Text>{this.state.jobData.province}
                            </Text>
                        </View>
                        <View style={style.textWithIcon}>
                            <Icon2
                                name="credit"
                                size={15}
                                color="#757575"
                            />
                            <Text style={style.textWithIconText}>
                                <Text style={{ fontWeight: 'bold' }}>Mức lương: </Text>{this.state.jobData.salary}
                            </Text>
                        </View>
                        <View style={style.textWithIcon}>
                            <Icon
                                name="book"
                                size={15}
                                color="#757575"
                            />
                            <Text style={style.textWithIconText}>
                                <Text style={{ fontWeight: 'bold' }}>Kinh nghiệm: </Text>{this.state.jobData.expJob}
                            </Text>
                        </View>
                    </View>
                    <View style={style.jobDescription}>
                        <View style={style.jobDescriptionTop}>
                            <Text style={style.jobDescriptionTopText}>Mô tả công việc</Text>
                        </View>
                        <View style={style.jobDescriptionBottom}>
                            <Text style={style.jobDescriptionBottomText}>
                                {this.state.jobData.jobDescription}
                            </Text>
                        </View>
                    </View>
                    <View style={style.jobDescription}>
                        <View style={style.jobDescriptionTop}>
                            <Text style={style.jobDescriptionTopText}>Yêu cầu công việc</Text>
                        </View>
                        <View style={style.jobDescriptionBottom}>
                            <Text>
                                {this.state.jobData.jobRequirement}
                            </Text>
                        </View>
                    </View>
                    <View style={style.jobDescription}>
                        <View style={style.jobDescriptionTop}>
                            <Text style={style.jobDescriptionTopText}>Thông tin liên hệ</Text>
                        </View>
                        <View style={style.jobDescriptionBottom}>
                            <Text><Text style={{ fontWeight: 'bold' }}>Người liên hệ: </Text>Nông Thanh Thiên</Text>
                            <Text><Text style={{ fontWeight: 'bold' }}>Số điện thoại: </Text>0844066904</Text>
                            <Text><Text style={{ fontWeight: 'bold' }}>Email: </Text>Thiennong065@gmail.com</Text>
                            <Text><Text style={{ fontWeight: 'bold' }}>Địa chỉ: </Text>Xã Quân Hà, Huyện Bạch Thông, Tỉnh Bắc Kạn</Text>
                            <View style={style.underline} />
                            <TouchableOpacity
                                style={style.submitButton}
                            >
                                <Text style={style.submitButtonText}>
                                    Nộp hồ sơ
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={style.saveJobButton}
                            >
                                <Text style={style.saveJobButtonText}>
                                    Lưu công việc này
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    headerJob: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 10,
        borderBottomColor: '#999999',
        borderBottomWidth: 2 / PixelRatio.get()
    },
    headerJobName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    headerJobPlace: {
        marginTop: 5,
        color: '#999999'
    },
    jobInfo: {
        backgroundColor: 'white',
        paddingTop: 15,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    textWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7
    },
    textWithIconText: {
        marginLeft: 5,
        fontSize: 13
    },
    jobDescription: {
        marginTop: 10,
    },
    jobDescriptionTop: {
        backgroundColor: '#FAFAFA',
        padding: 10,
        borderBottomWidth: 2 / PixelRatio.get(),
        borderBottomColor: '#999999'
    },
    jobDescriptionTopText: {
        fontWeight: 'bold',
        paddingLeft: 5
    },
    jobDescriptionBottom: {
        backgroundColor: '#FFF',
        padding: 10,
    },
    underline: {
        marginVertical: 10,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: 'gray',
    },
    submitButton: {
        flexDirection: 'row',
        backgroundColor: '#1CBA43',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButtonText: {
        paddingVertical: 10,
        marginLeft: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    saveJobButton: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: 'orange',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveJobButtonText: {
        paddingVertical: 10,
        marginLeft: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    }
})