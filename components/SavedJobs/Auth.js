import React, { Component } from 'react'
import { View } from 'react-native'
import NeedLogged from './NeedLogged'
import SavedJobScreen from './SavedJobsScreen'
import global from '../global'

export default class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        global.reloadSavedJob = this.reload.bind(this)
    }

    reload() {
        this.setState({
            user: global.user
        })
    }

    componentDidMount() {
        this.setState({
            user: global.user
        })
    }

    render() {
        return (
            <View style={{flex: 1}}> 
                { this.state.user ? <SavedJobScreen user={this.state.user}/> : <NeedLogged/>}
            </View>
        )
    }
}