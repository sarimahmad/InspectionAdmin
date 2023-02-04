/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disableno-alert */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Loader from '../../Components/Loader';
import {LoginForm} from '../../helper/api';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {BLACK, GREY, ORANGE, PURPLE, RED, WHITE} from '../../helper/Color';
import {FONT, isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import Header from '../../Components/Headder/header';
import Validations from '../../helper/Validations'
class PreparedFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner_name: '',
      address: '',
      email: '',
      state: '',
      city: '',
      phone: '',
      country_code:'',
      loading:false,
    };
  }
  
  isFormFilled() {
    let owner_name = Validations.checkrequired(this.state.owner_name);
    let address = Validations.checkrequired(this.state.address);
    let email = Validations.checkEmail(this.state.email);
    let state = Validations.checkPassword(
      this.state.state,
    );
    let phone = Validations.checkrequired(this.state.phone);
    let country_code = Validations.check_Country_Code(this.state.country_code);
    let city = Validations.checkrequired(this.state.city);

    if (
      owner_name &&
      address &&
      email &&
      state &&
      phone &&
      country_code &&
      city 

    ) {
      return true;
    }
    if (!owner_name) {
      alert('Invali Name');
    } else if (!address) {
      alert('Invalid address');
    } else if (!email) {
      alert('Invalid Email');
    } else if (!state) {
      alert('Invalid State');
    } else if (!phone) {
      alert('Invalid Number');
    } else if (!country_code) {
      alert('Invalid Country Code');
    } else if (!city) {
      alert('Invalid City');
    }
    return false;
  }

  Pass(){
    if(this.isFormFilled()){
      this.props.navigation.navigate("PropertyLocation",{data:{
        owner_name:this.state.owner_name,
        address:this.state.address,
        email:this.state.email,
        state:this.state.state,
        city:this.state.city,
        country_code:this.state.country_code,
        phone:this.state.phone
      }})
    }
  }

  render() {
    return (
      <View
    
        style={styles.wrapperView}>
            <Header
              leftPress={()=> this.props.navigation.goBack()}
            />
        <SafeAreaView style={{flex: 1}}>
        <View style={{flex:1,paddingHorizontal:20 ,borderTopRightRadius: 10,borderTopLeftRadius:10}}>

        <Text style={[styles.itemTxt,{marginTop: 30}]}>Prepared for</Text>
        <Text style={{fontSize: 12, color: '#828282', fontWeight:'bold', marginTop: 30}}>New inspection step 1/5</Text>
        
        
        <View style={{flexDirection:'row', marginTop: 20, width:'100%'}}>
        <View style={{height:2, width: '20%', backgroundColor:PURPLE.dark, borderRadius:5}} />
        <View style={{height:2, width: '80%', backgroundColor:'#F2F2F2', borderRadius:5}} />
        </View>
       

        <View style={{flex:1}}>
        <ScrollView 
        bounces={false}
        style={{flex:1}}>
        
        <TextInput
        onChangeText={(value)=> this.setState({owner_name: value})}
        placeholder='Business or owner’s name'
        style={[styles.TextInput,{marginTop: 30}]}
        />
          <TextInput
          onChangeText={(value)=> this.setState({address: value})}
        placeholder='Address'
        style={styles.TextInput}
        />
        <TextInput
        onChangeText={(value)=> this.setState({email: value})}
        placeholder='Email'
        style={styles.TextInput}
        />
        <View>
        <Image 
        style={{height:20, width: 10, resizeMode:'contain', position:'absolute', right: 20, top: 12}}
        source={require('../../assets/down.png')}/>
        <TextInput
        onChangeText={(value)=> this.setState({state: value})}
        placeholder='State'
        style={styles.TextInput}
        />
        </View>
        <View>
        <Image 
        style={{height:20, width: 10, resizeMode:'contain', position:'absolute', right: 20, top: 12}}
        source={require('../../assets/down.png')}/>
        <TextInput
        onChangeText={(value)=> this.setState({city: value})}
        placeholder='City'
        style={styles.TextInput}
        />
        </View>
          <TextInput
          onChangeText={(value)=> this.setState({country_code: value})}
          placeholder='Zip code'
          style={styles.TextInput}
        />
          <TextInput
          onChangeText={(value)=> this.setState({phone: value})}
          placeholder='00 000 0000'
          style={styles.TextInput}
        />
        </ScrollView>
        </View>
    
        

        <View style={{flex:0.15 ,justifyContent:'flex-end'}}>
            <TouchableOpacity 
            onPress={()=> this.Pass()}
            style={[styles.Btn,{flexDirection:'row', paddingHorizontal: 20,justifyContent:'space-between'}]}>
            <Text style={[styles.itemTxt,{fontSize: 12, color:'white'}]}>Sign Up</Text>
            
            <Image style={{width: 11, height: 5}} source={require('../../assets/arrowup.png')}/>
            </TouchableOpacity>

        </View> 
        </View>

        </SafeAreaView>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor:'white'
  },

  itemTxt:{
    fontSize:34,
    fontWeight:'bold',
    color: '#282461'
  },
  TextInput:{
      width: '100%',
      height: 45,
      borderWidth: 1,
      borderColor: 'lightgrey',
     alignItems:'center',
     borderRadius: 10,
     paddingLeft: 40,
     marginBottom: 10,
     
  },
  Btn:{
    width: '100%',
    height: 45,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#282461',
    borderRadius: 10,
    marginBottom: 10
  }
});
function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
    role: state.user.role,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, access_token, role) =>
      dispatch(userActions.setUser({user, access_token, role})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreparedFor);
