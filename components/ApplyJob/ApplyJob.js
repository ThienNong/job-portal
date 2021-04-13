import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Text, TouchableOpacity, PixelRatio } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ApplyJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            refresh: false
        }
    }

    componentDidMount() {
        //this.getData()
    }

    render() {
        return (
            <SafeAreaView style={style.container}>
                <FlatList
                    ListHeaderComponent={
                        <View style={style.newJobsContainer}>
                            <View style={style.newJobsHeader}>
                                <Text style={style.newJobsHeaderText}>Công việc đã ứng tuyển: ({this.state.data.length})</Text>
                            </View>
                        </View>
                    }
                    data={this.state.data}
                    keyExtractor={(item) => item.title}
                    onRefresh={() => {}}
                    refreshing={this.state.refresh}
                    ListEmptyComponent={
                        <View style={style.emptyComponent}>
                            {this.state.refresh == false ? <Text style={style.emptyComponentText}>Bạn chưa ứng tuyển công việc nào</Text>  : <Text style={style.emptyComponentText}>Đang tải...</Text>}
                        </View>
                    }
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style={style.jobComponent}
                            onPress={() => this.props.navigation.navigate('JobDetail', { jobID: item.id })}
                        >
                            <View style={{ flexDirection: 'column', flex: 9 }}>
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
                            </View>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginLeft: 10 }}>
                                <Icon
                                    name="trash"
                                    size={25}
                                    color="black"
                                />
                            </TouchableOpacity>
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
        borderBottomWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    newJobsHeaderText: {
        marginHorizontal: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 12,
        color: 'red'
    },
    jobComponent: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingLeft: 10,
        paddingRight: 30,
        paddingVertical: 10,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#757575',
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
    },
    emptyComponent: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1 / PixelRatio.get()
    }
})