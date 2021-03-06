import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import LoginScreen from './components/Authentication/LoginScreen/';
import SignupScreen from './components/Authentication/SignupScreen';
import HomeScreen from './components/Home/HomeScreen';
import SearchResultScreen from './components/SearchResultScreen/SearchResultScreen';
import JobDetailScreen from './components/JobDetailScreen/JobDetailScreen';
import SavedJobScreen from './components/SavedJobs/Auth';
import User from './components/User/Auth';
import UserInfo from './components/User/UserInfo/UserInfo';
import ApplyJob from './components/ApplyJob/ApplyJob';
import EmployeeScreen from './components/Employee/EmployeeScreen';
import AddJob from './components/Employee/AddJob';
import YourJobs from './components/Employee/YourJobs';
import CandidateJobList from './components/Employee/CandidateJobList';

const StackHome = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      //headerShown: false,
      title: 'Trang chủ',
      headerTitleAlign: 'center',
    },
  },
  SearchResult: {
    screen: SearchResultScreen,
    navigationOptions: {
      title: '',
    },
  },
  JobDetail: {
    screen: JobDetailScreen,
    navigationOptions: {
      title: '',
    },
  },
  EmployeeScreen: {
    screen: EmployeeScreen,
    navigationOptions: {
      title: '',
    },
  },
  AddJob: {
    screen: AddJob,
    navigationOptions: {
      title: 'Đăng tin tuyển dụng',
    },
  },
  YourJobs: {
    screen: YourJobs,
    navigationOptions: {
      title: 'Công việc của bạn',
    },
  },
  CandidateJobList: {
    screen: CandidateJobList,
    navigationOptions: {
      title: 'Danh sách ứng viên',
    },
  }
});

const StackSavedJob = createStackNavigator({
  SavedJob: {
    screen: SavedJobScreen,
    navigationOptions: {
      //headerShown: false,
      title: 'Công việc đã lưu',
      headerTitleAlign: 'center',
    },
  },
  JobDetail: {
    screen: JobDetailScreen,
    navigationOptions: {
      title: '',
    },
  },
});

const UserNavigator = createStackNavigator({
  User: {
    screen: User,
    navigationOptions: {
      //headerShown: false,
      title: 'Tài khoản',
      headerTitleAlign: 'center',
    },
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      //headerShown: false,
      title: 'Đăng nhập',
      headerTitleAlign: 'center',
    },
  },
  SignupScreen: {
    screen: SignupScreen,
    navigationOptions: {
      //headerShown: false,
      title: 'Đăng ký',
      headerTitleAlign: 'center',
    },
  },
  SavedJob: {
    screen: SavedJobScreen,
    navigationOptions: {
      //headerShown: false,
      title: 'Công việc đã lưu',
      headerTitleAlign: 'center',
    },
  },
  UserInfo: {
    screen: UserInfo,
    navigationOptions: {
      //headerShown: false,
      title: 'Thông tin cá nhân',
      headerTitleAlign: 'center',
    },
  },
  ApplyJob: {
    screen: ApplyJob,
    navigationOptions: {
      //headerShown: false,
      title: 'Công việc đã ứng tuyển',
      headerTitleAlign: 'center',
    },
  },
});

const MyTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: StackHome,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" color={tintColor} size={20} />
        ),
      },
    },
    SavedJob: {
      screen: StackSavedJob,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="star" color={tintColor} size={20} />
        ),
      },
    },
    User: {
      screen: UserNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="user" color={tintColor} size={20} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    order: ['Home', 'SavedJob', 'User'],
    tabBarOptions: {
      showLabel: false,
    },
  },
);

const MyStackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  MyTabNavigator: {
    screen: MyTabNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(MyStackNavigator);
