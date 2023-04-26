import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native'; 

const styles = StyleSheet.create({

container: {
  flex: 1,
},
////////////////////
Top_Header_Bar_Border:{
  borderRadius: 0,
  backgroundColor:'#93C572',
  width: 420,
  height: 100,
},

Jasper_left_image:{
  top:30,
  left:17,
  height:70,
  width:70,
},

Top_Header_Bar_Text:{
  bottom:15,
  textAlign:'center',
  color:'#008000',
  fontSize:26,
  fontFamily:'Arial-BoldItalicMT',
},

Jasper_right_image:{
  height:70,
  width:70,
  bottom:69,
  left:323
  
},
///////////////////////////////////
login:{
    flex: 1,
},

background_image:{
    flex: 1,
},

signup_border:{
    borderRadius: 20,
    backgroundColor:'#93C572',
    width: 360,
    height: 710,
    alignSelf: 'center',
    top:40
},

signup_text:{
  fontSize:35, 
  fontWeight:'bold',
  fontFamily:'Helvetica',
  paddingTop:30,
  color: 'white',
  alignSelf:'center',
},

signup_email:{
   fontSize:23,
   paddingLeft: 10,
   paddingTop: 30,

},

signup_email_border:{
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor:'white',
    
},

signup_email_icon:{
    height:30,
    width: 30,
    borderRadius:5,
    bottom:24,
    left:3
},

signup_email_text:{
    paddingLeft:40,
    paddingTop:10,
},

signup_password_icon:{
    height:30,
    width: 30,
    borderRadius:5,
    bottom:24,
    
},

signup_password_text:{
    paddingLeft:40,
    paddingTop:10,
    
},
signup_check_password:{
  textAlign:'center',
  bottom:20
},
signup_dont_match:{
  textAlign:'center',
  bottom:20,
},
have_account_text:{
    fontSize:16,
    paddingLeft:60,
    paddingTop:50,
},

sign_in_button:{
    left:250,
    bottom:19.5,
    fontSize:16,
    color:'blue',
},

sign_up_button_border:{
    borderRadius:30,
    backgroundColor:'#8A9A5B',
    width:150,
    height:50,
    alignSelf:'center',
    top:18

},

sign_up_button:{
  alignSelf:'center',
  fontSize:25,
  paddingTop:9,
  color:'white'
},
//////////////////////
login_border:{
  borderRadius: 20,
  backgroundColor:'#93C572',
  width: 360,
  height: 610,
  alignSelf: 'center',
  top:70
},

login_text:{
  fontSize:35, 
  fontWeight:'bold',
  fontFamily:'Helvetica',
  paddingTop:30,
  color: 'white',
  alignSelf:'center',
},
login_email:{
  fontSize:23,
  paddingLeft: 10,
  paddingTop: 30,

},
login_email_border:{
   margin: 15,
   height: 40,
   borderColor: 'black',
   borderWidth: 2,
   borderRadius: 5,
   backgroundColor:'white',
},

login_email_icon:{
   height:30,
   width: 30,
   borderRadius:5,
   bottom:24,
   left:3
},

login_email_text:{
   paddingLeft:40,
   paddingTop:10,

  
},
login_password_icon:{
   height:30,
   width: 30,
   borderRadius:5,
   bottom:24,
   
},

login_password_text:{
   paddingLeft:40,
   paddingTop:10,
   
},

login_button_border:{
  borderRadius:30,
  backgroundColor:'#8A9A5B',
  width:150,
  height:50,
  alignSelf:'center',
  top:30
},

login_button:{
alignSelf:'center',
fontSize:25,
paddingTop:9,
color:'white'
},

NoAccountButton:{
    fontSize:16,
    paddingLeft:60,
    paddingTop:10,
},

NoAccountSignUpButton:{
    left:235,
    bottom:19.5,
    fontSize:16,
    color:'blue',
},

forgot_password:{
  left:215,
  top:3,
  fontSize:16,
  color:'blue',
},

new_user_text:{
  fontSize:16,
  left:110,
  top:160

},

new_user_button:{
  left:198,
  top:141,
  fontSize:16,
  color:'blue',
},

///////////
page: {
  flex: 1,
  backgroundColor: '#023020',
  
},

fontStyle:{
  borderWidth:2,
  borderColor: 'black',
},

flatlist:{
  flex:1,
},

profile_icon:{
  height:25,
  width:25,
  top:30,
  left:15,
  borderRadius:40,
  backgroundColor:'white'
},

font:{
  textAlign: 'left',
  padding: 40,
  alignSelf:'flex-start',
  padding: 8,
  
},

comment: {
  borderWidth: 1,
  fontSize: 12,
  fontFamily: 'Noteworthy',
  borderColor: 'black',
  textAlign: 'flex-right',
  justifyContent: 'center',
  alignItems: 'center',
},

posts:{
  borderWidth: 1,
},

button:{
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
},

private_email:{
  fontSize:14,
  color:'white',
  fontFamily:'Verdana-Bold',
  top:9,
  left:50,
},

image:{
  width: 415, 
  height: 280,
  display: 'flex',
  justifyContent: 'center',
},

thumbs_up_icon:{
  right:40,
  bottom:10,
},

comment_icon:{
  right:60,
  bottom:10
},

share_icon:{
  left:253,
  bottom:50
},

like_text:{
  top:24,
  left:80,
  color:'white',
  fontWeight:'bold',
  fontSize:17,
},

comment_text:{
  top:2,
  left: 175,
  color:'white',
  fontWeight:'bold',
  fontSize:17,
},

share_text:{
  bottom:19,
  left:315,
  color:'white',
  fontWeight:'bold',
  fontSize:17,
},

users_post:{
  color:'white',
  left:0,
  paddingLeft:20,
  paddingRight:15,
  paddingTop:10,
  paddingBottom:25,
  fontSize:15,
},

abstract:{
  color:'white',
  fontWeight:'bold',
  fontSize:16,
  left:20,
},

///////////////////////////////////

home:{
  top:14,
  left:27,
},

navigation:{
  left:105,
  bottom:27,
},

Post :{
  left:188,
  bottom:66
},

Search:{
  left:267,
  bottom:107,
},

profile:{
  left:340,
  bottom:143,
},

nav:{
  backgroundColor: `#93C572`,
  top:16,
  height:70
},

///////////////////////////////////

navs:{
  backgroundColor: `#93C572`,
  height:70,
  top:16,
},
////////////////////////

post: {
  borderWidth: 1,
  paddingLeft: 30,
  paddingBottom:30,
  paddingRight:5,
  width:415,
  fontSize: 20,
  fontFamily: 'Sinhala Sangam MN',
  borderColor: 'black',
  color:'black',
  backgroundColor:'white',
  
},

camera_border:{
  borderWidth: 1,
  borderColor: 'black',
  backgroundColor:'#36454F',
  borderRadius:20,
  width:150,
  height:60,
  left:32,
},

camera_icon:{
  height:27,
  width:27,
  top:14,
  left:30,
},

camera_text:{
  left:67,
  bottom:5,
  color:'white'
},

camera_roll_border:{
  borderWidth: 1,
  borderColor: 'black',
  backgroundColor:'#36454F',
  borderRadius:20,
  width:150,
  height:60,
  left:230,
  bottom:59,
},

camera_roll_icon:{
  height:27,
  width:27,
  top:14,
  left:17,
},

camera_roll_text:{
  left:53,
  bottom:5,
  color:'white'
},

upload_image_border:{
  borderWidth: 1,
  borderColor: 'black',
  backgroundColor:'#36454F',
  borderRadius:20,
  width:150,
  height:60,
  left:230,
  bottom:88
},

upload_image_icon:{
  height:27,
  width:27,
  top:14,
  left:8,
  //backgroundColor:'white'
},

doc_text:{
  left:60,
  bottom:7,
  color:'white'
},

doc_border:{
  borderWidth: 1,
  borderColor: 'black',
  backgroundColor:'#36454F',
  borderRadius:20,
  width:150,
  height:60,
  left:33,
  bottom:30
},

doc_icon:{
  height:27,
  width:27,
  top:14,
  left:20,
},

upload_image_text:{
  left:43,
  bottom:23,
  color:'white'
},

create_post:{
  fontSize: 20,
  fontFamily: 'Noteworthy',
  textAlign:'center',
  fontSize:27,
  color:'white',
  top:20,
},
//////

full_profile_page:{
  flex: 1,
  backgroundColor: '#90ee90',
  textAlign: "center"
},

users_image:{
  width:80,
  height:80,
  backgroundColor:'white',
  borderRadius: 40,
  left:166,
  top:35
},

profile_full_name:{
  left:130,
  color:'white',
  fontSize:25,
  top:10,
  
},

hold_profile_info:{
  top:40,
  width:430,
  height:495,
  borderWidth:5,
  borderColor:'black',
  backgroundColor:'#93C572',
},

personal_info_text:{
  textAlign:'center',
  bottom:434,
  fontSize:20,
  fontWeight:'bold',
  textDecorationLine:'underline',

},

profile_border1:{
  left:19,
  borderColor:'black',
  borderRadius:20,
  borderWidth:5,
  backgroundColor:'#36454F',
  width:380,
  height:180,
  bottom:424,
},

first_name_text:{
  color:'black',
  fontSize:17,
  fontWeight:'bold',
},

first_name:{
  color:'white',
  fontSize:17,
},

last_name_text:{
  color:'black',
  fontSize:17,
  fontWeight:'bold',
},

last_name:{
  color:'white',
  fontSize:17,
},

users_email_text:{
  color:'black',
  fontSize:17,
  fontWeight:'bold',
},

users_email:{
  color:'white',
  fontSize:17,
},

username_text:{
  color:'black',
  fontSize:17,
  fontWeight:'bold',
},

username:{
  color:'white',
  fontSize:17,
},

about_me_text:{
  textAlign:'center',
  bottom:409,
  fontSize:20,
  fontWeight:'bold',
  textDecorationLine:'underline',

},

profile_border2:{
  left:19,
  borderColor:'black',
  borderRadius:20,
  borderWidth:5,
  backgroundColor:'#36454F',
  width:380,
  height:180,
  bottom:399,
  marginBottom:-360
},

school_text:{
  color:'black',
  fontSize:17,
  fontWeight:'bold',
},

school:{
  color:'white',
  fontSize:17,
},

major_text:{
  color:'black',
  fontSize:17,
  fontWeight:'bold',
},

major:{
  color:'white',
  fontSize:17,
},

gpa_text:{
  color:'black',
  fontSize:17,
  fontWeight:'bold',
},

gpa:{
  color:'white',
  fontSize:17,
},

extra_info_text:{
  color:'black',
  fontSize:17,
  fontWeight:'bold',
},

extra_info:{
  color:'white',
  fontSize:17,
},

//////////
menuIcon:{
  width: 40,
  height: 40,
  top:105,
  right:10
},
    
box:{
  width:100,
  top:-100,
  height:106,
  alignItems: 'center',
  marginBottom:-105,
},

menu:{
  width:200,
  borderRadius:5,
  top:50,
  position:"absolute",
  borderRadius:20
},

menuItem:{
  backgroundColor:'black',
  borderColor:'white',
  height:45,
  alignItems:'center',
  justifyContent:'center',
},
  
menuText:{
  color:'white',
  fontSize:20,
  fontWeight:'bold',
},

TopBannerBorder:{
  zIndex:1
},
/////////////////////////////

profile_edit_title:{

  fontSize: 30,
  paddingBottom:7,
  paddingTop:5,
  textAlign:'center',
  marginBottom:-45,
  color:'white',
  borderWidth:1,
},

Edit_Profile_Fname_Text:{
  color:'white',
  fontSize:18,
  fontWeight:'bold',
  top:10,
  left:26,
  marginTop:10
},

Edit_Profile_Fname:{
  borderWidth: 3,
  padding: 20,
  width:175,
  borderRadius:10,
  fontSize: 20,
  borderColor: 'black',
  left:20,
  backgroundColor:'white',
},

Edit_Profile_Lname_Text:{
  color:'white',
  fontSize:18,
  fontWeight:'bold',
  left:220,
  bottom:11
},

Edit_Profile_Lname:{
  borderWidth: 3,
  padding: 20,
  width:175,
  borderRadius:10,
  fontSize: 20,
  borderColor: 'black',
  left:215,
  bottom:70,
  backgroundColor:'white',
},

Edit_Profile_School_Text:{
  color:'white',
  fontSize:18,
  fontWeight:'bold',
  bottom:60,
  left:26,
  marginTop:10
},

Edit_Profile_School:{
  borderWidth: 3,
  padding: 20,
  width:370,
  borderRadius:10,
  fontSize: 20,
  borderColor: 'black',
  left:20,
  backgroundColor:'white',
  bottom:50,

},

Edit_Profile_Major_Text:{
  color:'white',
  fontSize:18,
  fontWeight:'bold',
  bottom:30,
  left:26,
},

Edit_Profile_Major:{
  borderWidth: 3,
  padding: 20,
  width:175,
  borderRadius:10,
  fontSize: 20,
  borderColor: 'black',
  left:20,
  backgroundColor:'white',
  bottom:40,
},

Edit_Profile_GPA_Text:{
  color:'white',
  fontSize:18,
  fontWeight:'bold',
  left:220,
  bottom:51
},

Edit_Profile_GPA:{
  borderWidth: 3,
  padding: 20,
  width:175,
  borderRadius:10,
  fontSize: 20,
  borderColor: 'black',
  left:215,
  bottom:109,
  backgroundColor:'white',
},

Edit_Profile_Info_Text:{
  color:'white',
  fontSize:18,
  fontWeight:'bold',
  bottom:100,
  left:26,
  marginTop:10
},

Edit_Profile_Info:{
  borderWidth: 3,
  padding: 20,
  width:370,
  borderRadius:10,
  fontSize: 20,
  borderColor: 'black',
  left:20,
  backgroundColor:'white',
  bottom:85,
},

Edit_Profile_Save_Button:{
  fontSize:30,
  borderWidth:1,
  width:170,
  height:60,
  textAlign:'center',
  justifyContent:'center',
  left:120,
  borderRadius:20,
  backgroundColor:'#8A9A5B',
  bottom:50,
},
//////////////////////////////
Enter_Comment:{
  borderWidth: 3,
  //padding: 10,
  //width:300,
  borderRadius:10,
  fontSize: 25,
  fontFamily: 'Noteworthy',
  borderColor: 'black',
  textAlign: 'center'
},

Post_Comment_Button:{
  
  textAlign:'center',
  fontSize:17,
},

testing:{
  marginBottom:538,
  borderWidth:1,
  width:170,
  height:60,
  justifyContent:'center',
  left:120,
  borderRadius:20,
  backgroundColor:'#8A9A5B',
  top:500
},
////////////////////////////
Landing_Page_Title:{
  color:'white',
  marginBottom:20,
  marginTop:30,
  fontSize:30,
  fontWeight:'bold',
  textAlign:'center'
},
landingimage:{
  height:230,
  width:415,
  marginBottom:50,
},
Landing_Page_Welcome_Section:{
  color:'black',
  fontSize:18,
  padding:10,
  backgroundColor:'#93C572',
  fontFamily:'Arial Hebrew',
  fontWeight:'bold',
  marginBottom:50,
},
Landing_Page_SignOrLogin_Text:{
  color:'white',
  fontSize:20,
  marginBottom:20,
  textAlign:'center',
},

Landing_SignUp_Button:{
  backgroundColor:'black',
  borderWidth:1,
  borderColor:'white',
  borderRadius:10,
  padding:10,
  width:95,
  marginTop:15,
  left:230
},
Landing_Login_Button:{
  backgroundColor:'black',
  borderWidth:1,
  borderColor:'white',
  borderRadius:10,
  padding:10,
  margin:10,
  width:95,
  bottom:56,
  left:80
},
Landing_Login_Text:{
  color:'white',
  fontSize:20,
  left:12,
},
Landing_SignUp_Text:{
  color:'white',
  fontSize:20,
},
Landing_Page_AboutUs_Border:{
  borderWidth:5,
  marginTop:-10,
},
Landing_Page_AboutUs_Text:{
  fontSize:30,
  fontWeight:'bold',
  textAlign:'center',
  color:'white',
  paddingTop:50,
  
},
////////////////////////////
Initial_SignUp_Image:{
  width:250,
  height:250,
  left:50,
  marginBottom:-50,
},

Initial_SignUp_Input:{
  borderWidth: 1,
  borderColor: 'black',
  padding: 10,
  margin: 10,
  fontSize: 18,
  fontWeight: 'bold',
  color: 'black',
  textAlign: 'center',
  marginBottom: 20,
  width:300,
},
Initial_SignUp_Button_Border:{
  borderRadius:30,
  backgroundColor:'#8A9A5B',
  width:150,
  height:50,
  alignSelf:'center',
  top:30,
  paddingTop:5,
},
Initial_SignUp_Email_Border:{
  margin: 15,
  height: 40,
  borderColor: 'black',
  borderWidth: 2,
  borderRadius: 5,
  backgroundColor:'white',
},

/////////////////////////////

});

export { styles }