import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Text, TouchableOpacity, PixelRatio } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class SearchResultScreen extends Component {

    constructor(props) {
        super(props),
            this.state = {
                jobsList: []
            }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        const searchText = this.props.navigation.getParam('SearchText', '')
        const province = this.props.navigation.getParam('province', '')
        const carrier = this.props.navigation.getParam('carrier', '')
        fetch("http://192.168.20.102:8080/WebService/searchJob.php?jobTitle=" + searchText + "&province=" + province + "&typejob=" + carrier + "")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    jobsList: responseJson
                })
            })
            .catch((e) => { console.log(e) })
    }

    render() {
        return (
            <SafeAreaView style={style.container}>
                <FlatList
                    ListHeaderComponent={
                        <View style={style.newJobsContainer}>
                            <View style={style.newJobsHeader}>
                                <Text style={style.newJobsHeaderText}>Kết quả tìm kiếm: ({this.state.jobsList.length})</Text>
                            </View>
                        </View>
                    }
                    data={this.state.jobsList}
                    keyExtractor={(item) => item.title}
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
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
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
        marginHorizontal: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
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
    },
    underlineView: {
        marginTop: 10,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: 'gray',
    }
})