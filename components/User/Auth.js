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
        this._isMounted = true
        global.reloadUserMenu = this.reload.bind(this)
    }

    _isMounted = false

    reload() {
        if (this._isMounted === true)
        {
            this.setState({
                user: global.user
            })
        }
    }

    UNSAFE_componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {
        this._isMounted = true
        if (this._isMounted === true) {
            this.setState({
                user: global.user
            })
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                { this.state.user ? <User user={this.state.user} navigation={this.props.navigation}/> : <Guest navigation={this.props.navigation}/> }
            </SafeAreaView>
        )
    }
}