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
import {CreateInspection} from '../../helper/api';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {BLACK, GREY, ORANGE, PURPLE, RED, WHITE} from '../../helper/Color';
import {FONT, isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import Header from '../../Components/Headder/header';
import Validations from '../../helper/Validations';
class PreparedBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      pforBusinessName: '',
      pforNumber: '',
      pforEmail: '',
      pforDate: '',
      pforName: '',
      loading: false,
    };
  }

  componentDidMount(){

    const data = this.props.route.params.data;

    this.setState({data:data})
  }
  
  isFormFilled() {
    let pforBusinessName = Validations.checkrequired(this.state.pforBusinessName);
    let pforNumber = Validations.checkrequired(this.state.pforNumber);
    let pforEmail = Validations.checkrequired(this.state.pforEmail);
    let pforDate = Validations.checkrequired(this.state.pforDate);
    let pforName = Validations.checkrequired(this.state.pforName);

    if (
      pforBusinessName &&
      pforNumber &&
      pforEmail &&
      pforDate &&
      pforName
    ) {
      return true;
    }
    if (!pforBusinessName) {
      alert('Invali Business Name');
    } else if (!pforNumber) {
      alert('Invalid Number');
    } else if (!pforEmail) {
      alert('Invalid Email');
    } else if (!pforDate) {
      alert('Invalid Date');
    } else if (!pforName) {
      alert('Invalid Name');
    }
    return false;
  }
  async CreateInspection(){
    this.setState({loading: true});
      const dataToSend={
        owner_name: this.state.data.backEnd.backdata.preparedFor.owner_name,
        address: this.state.data.backEnd.backdata.preparedFor.address,
        email:this.state.data.backEnd.backdata.preparedFor.email,
        state: this.state.data.backEnd.backdata.preparedFor.state,
        city: this.state.data.backEnd.backdata.preparedFor.city,
        phone: this.state.data.backEnd.backdata.preparedFor.phone,
        country_code: this.state.data.backEnd.backdata.preparedFor.country_code,
        property_address: this.state.data.backEnd.backdata.address1t,
        property_address2: this.state.data.backEnd.backdata.address2,
        property_city: this.state.data.backEnd.backdata.propcity,
        property_state: this.state.data.backEnd.backdata.propstate,
        property_zip_code: this.state.data.backEnd.backdata.zip_code,
        management_name: this.state.data.backEnd.manage_name,
        management_address: this.state.data.backEnd.manage_address,
        management_phone: this.state.data.backEnd.manage_phone,
        management_email: this.state.data.backEnd.manage_email,
        image_url: this.state.data.image.type,
        pfor_buisness_name: this.state.pforBusinessName,
        pfor_phone: this.state.pforNumber,
        pfor_email: this.state.pforEmail,
        pfor_date: this.state.pforDate,
        pfor_name: this.state.pforName
      }
      console.log(dataToSend);
      const token = this.props.userToken;
      
      if(this.isFormFilled()){
        await CreateInspection(token,dataToSend).then(response => {
          if (response.status === 200 && !response.data.error) {
            console.log(response);  
            if(response.data.success){
              this.props.callApi(response.data)
              this.props.navigation.navigate("Review",{dataToSend})
              this.setState({loading: false});
            }
            else{
              alert("Inspection Not Created")
            }
          } 
          else{
            alert("Some thing Went Wrong")
          }
        });
      }
  
    this.setState({loading: false});
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

        <Text style={[styles.itemTxt,{marginTop: 30}]}>Prepared by</Text>
        <Text style={{fontSize: 12, color: '#828282', fontWeight:'bold', marginTop: 30}}>New inspection step 5/5</Text>
        
        
        <View style={{flexDirection:'row', marginTop: 20, width:'100%'}}>
        <View style={{height:3, width: '100%', backgroundColor: PURPLE.dark, borderRadius:5}} />
        </View>
       

        <View style={{flex:1}}>
        <ScrollView 
        bounces={false}
        style={{flex:1}}>
        
        <TextInput
        onChangeText={(val)=> this.setState({pforBusinessName: val})}
        placeholder='Deck and Balcony Inspection Inc.'
        style={[styles.TextInput,{marginTop: 30}]}
        />
          <TextInput
          onChangeText={(val)=> this.setState({pforNumber: val})}
        placeholder='(916) 238-0618'
        style={styles.TextInput}
        />

        <TextInput
        onChangeText={(val)=> this.setState({pforEmail: val})}
        placeholder='dan@deckandbalconyinspections.com'
        style={styles.TextInput}
        />

  
        <TextInput
        onChangeText={(val)=> this.setState({pforName: val})}
        placeholder='Dan Cronk'
        style={styles.TextInput}
        />


        <TextInput
        onChangeText={(val)=> this.setState({pforDate: val})}
        placeholder='28/12/2021'
        style={styles.TextInput}
        />

        </ScrollView>
        </View> 
        

        <View style={{flex:0.15 ,justifyContent:'flex-end'}}>
            <TouchableOpacity 
            onPress={()=> this.CreateInspection()}
            style={[styles.Btn]}>
            <Text style={[styles.itemTxt,{fontSize: 12, color:'white'}]}>Finish</Text>

            </TouchableOpacity>

        </View> 
        </View>

        </SafeAreaView>
          {this.state.loading && <Loader loading={this.state.loading} />}
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
      backgroundColor:'#E0E0E0',
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
    Ins_id: state.user.Ins_id
  };
}
const mapDispatchToProps = dispatch => {
  return {
    callApi: (Ins_id) =>
    dispatch(userActions.setInsId({Ins_id})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreparedBy);
