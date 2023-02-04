/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

import {connect} from 'react-redux';

import * as userActions from '../../redux/actions/user';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    this.checkUSer();
  }
  checkUSer = async () => {
    setTimeout(async () => {
      this.props.navigation.navigate('Login');
    }, 500);
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor:'#282461'}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={{width: 139, height: 139, borderRadius: 70, alignItems:'center', justifyContent:'center', backgroundColor:'white'}}>
                <Text style={{fontSize: 18, fontWeight:'bold', color: '#282461'}}>Logo here</Text>
            </View>

          </View>
        </SafeAreaView>
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, access_token, role) =>
      dispatch(userActions.setUser({user, access_token, role})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
