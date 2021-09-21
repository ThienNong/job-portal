import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PixelRatio,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import getCandidate from '../../api/getCandidate';

export default class CandidateJobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobID: this.props.navigation.getParam('jobID'),
      data: [],
      refresh: false,
    };
  }

  getData() {
    this.setState({
      refresh: true,
    }),
      getCandidate(this.state.jobID).then((responseJson) => {
        this.setState({
          data: responseJson,
          refresh: false
        });
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <SafeAreaView style={style.container}>
        <FlatList
          ListHeaderComponent={
            <View style={style.newJobsContainer}>
              <View style={style.newJobsHeader}>
                <Text style={style.newJobsHeaderText}>
                  DANH SÁCH ỨNG VIÊN: ({this.state.data.length})
                </Text>
              </View>
            </View>
          }
          keyExtractor={(item) => item.user}
          onRefresh={this.getData.bind(this)}
          refreshing={this.state.refresh}
          data={this.state.data}
          ListEmptyComponent={
            <View style={style.emptyComponent}>
              {this.state.refresh == false ? (
                <Text style={style.emptyComponentText}>
                  Chưa có người ứng tuyển!
                </Text>
              ) : (
                <Text style={style.emptyComponentText}>Đang tải...</Text>
              )}
            </View>
          }
          renderItem={({item}) => (
            <View style={style.jobDescription}>
              <View style={style.jobDescriptionBottom}>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Tên ứng viên: </Text>{item.name}
                </Text>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Giới tính: </Text>
                  {item.sex}
                </Text>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Số điện thoại: </Text>
                  {item.phone}
                </Text>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Email: </Text>
                  {item.user}
                </Text>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Địa chỉ: </Text>{item.address}
                </Text>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Công việc chính: </Text>{item.job}
                </Text>
                <Text>
                  <Text style={{fontWeight: 'bold'}}>Ghi chú khác: </Text>{item.other}
                </Text>
              </View>
              <View style={style.underline} />
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  newJobsContainer: {
    flex: 1,
    marginTop: 10,
  },
  newJobsHeader: {
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
    borderBottomColor: '#757575',
    borderBottomWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  newJobsHeaderText: {
    marginHorizontal: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 12,
    color: 'red',
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
    color: '#757575',
  },
  placeSalaryHolder: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
  textWithIcon: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallTextInFlatComponent: {
    fontSize: 13,
    marginLeft: 5,
    color: '#757575',
    paddingRight: 10,
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
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  jobDescription: {
    //marginTop: 10,
    backgroundColor: '#FFF',
  },
  jobDescriptionTop: {
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderBottomWidth: 2 / PixelRatio.get(),
    borderBottomColor: '#999999',
  },
  jobDescriptionTopText: {
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  jobDescriptionBottom: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  underline: {
    marginTop: 10,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'gray',
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#1CBA43',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
