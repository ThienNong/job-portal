import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import global from '../global'
import Guest from './Guest'
import User from './User'

export default class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        global.reloadUserMenu = this.reload.bind(this)
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
            <SafeAreaView style={{flex: 1}}>
                { this.state.user ? <User user={this.state.user} /> : <Guest navigation={this.props.navigation}/> }
            </SafeAreaView>
        )
    }
}