/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disableno-alert */
import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Loader from '../../Components/Loader';
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, PURPLE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';

class PropertiesforInspection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            data:[{id:1,txt:'Lorem ipsum'},
            {id:2,txt:'Lorem ipsum'},
            {id:3,txt:'Lorem ipsum'},
            {id:4,txt:'Lorem ipsum'},
            {id:5,txt:'Lorem ipsum'},
            {id:6,txt:'Lorem ipsum'},],
            loading: false,
        };
    }

    render() {
        return (
            <View
                style={styles.wrapperView}>
                <SafeAreaView style={{ flex: 1 }}>
                   <Text style={[styles.itemTxt, { fontSize: 24 ,textAlign:'center' ,fontWeight:"bold"}]}>Properties for inspection</Text>
                

                <View style={{flex:1}}>

                <View style={{height:'100%', alignSelf:'center',position:'absolute',marginTop: 20}}>
                <FlatList
                data={this.state.data}
                keyExtractor={(item, index)=> index.toString()}
                renderItem={({item})=> (
                    <View style={styles.itemView}>
                        <Image 
                        style={{width: '90%',marginTop: 20 ,height: 121, alignSelf:'center' ,resizeMode: "stretch"}}
                        source={require('../../assets/pic3.png')}/>

                    <View style={{flexDirection:'row',justifyContent:"space-between", alignItems:"center",width:'90%', alignSelf:"center", marginTop: 10}}>
                    <Text style={[styles.itemTxt, { fontSize: 12 ,textAlign:'center' ,fontWeight:"bold"}]}>{item.txt}</Text>
                   
                    <View style={{flexDirection:'row'}}>
                        <Image 
                        style={{width:10, height: 14, marginRight: 7}}
                        source={require('../../assets/pdf.png')}/>
                    <Text style={[styles.itemTxt, { fontSize: 12 ,textAlign:'center' ,fontWeight:"bold"}]}>Save pdf</Text>
                    </View>  
                    </View>   
                    </View>
                )}
                />
                </View>
                </View>
                <View style={{justifyContent:'flex-end', alignItems:"flex-end"}}>
                   <TouchableOpacity 
            onPress={()=> this.props.navigation.navigate("Inspection")}
            style={{alignItems:'center',justifyContent:'center', backgroundColor:PURPLE.dark,height: 73, width: 73, borderRadius: 40,}}>
            <Image style={{width: 27, height: 27}} source={require('../../assets/plus.png')}/>
            </TouchableOpacity>

            
            </View>
                    
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapperView: {
        flex: 1,
        backgroundColor: 'white'
    },

    itemTxt: {
        fontSize: 12,
        fontWeight: '500',
        color: '#282461',
    },
    itemView:{
        width: SCREEN.width - 40,
        alignSelf: "center",
        backgroundColor:"white",
        height: isIphoneXorAbove ? SCREEN.height / 4.8 : SCREEN.height / 4,
        marginBottom: 20,
        borderRadius: 10,      
        shadowColor: 'lightgrey',
        shadowOffset: { width: -2, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 3,     

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
            dispatch(userActions.setUser({ user, access_token, role })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesforInspection);
