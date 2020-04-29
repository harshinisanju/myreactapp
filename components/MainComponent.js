import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './Homecomponent';
import Dishdetail from './DishdetailComponent';
import { View ,Text,Platform,Image,StyleSheet,ScrollView} from 'react-native';
import {createStackNavigator,createDrawerNavigator,DrawerItems,SafeAreaView} from 'react-navigation';
import { Icon } from 'react-native-elements';
import Contactus from './Contactus';
import Aboutus from './Aboutus';
const CustomdrawContentCompomnent=(props)=>(
<ScrollView>
<SafeAreaView style={StyleSheet.Container}
forceInset={{top:'always',horizontal:'never'}}>
<View style={styles.drawHeader}>
  <View style={{flex:1}}>
  <Image source= {require('./images/logo.png')}
  style={styles.drawerImage}/>
  </View>
  <View style={{flex:2}}>
    <Text style={styles.drawText}>
      Ristorante con Fusion
    </Text>
  </View>
</View>
<DrawerItems {...props}/>
</SafeAreaView>
</ScrollView>
);

const MenuNavigator =
  createStackNavigator({
    Menu:{screen :Menu,
    navigationOptions: ({navigation})=>({
      headerLeft :<Icon name='menu' size={24} color='white'
      onPress={()=> navigation.toggleDrawer()}/>

    })
  },
    Dishdetail:{screen :Dishdetail}
  },{

    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
    
  });
  const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  ,
      headerLeft :<Icon name='menu' size={24} color='white'
      onPress={()=> navigation.toggleDrawer()}/>

    })
});
const ContactNavigator = createStackNavigator({
  Contactus: { screen: Contactus}
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  ,
    headerLeft :<Icon name='menu' size={24} color='white'
    onPress={()=> navigation.toggleDrawer()}/>

  })
});
const AboutNavigator = createStackNavigator({
  Aboutus: { screen: Aboutus}
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  ,
    headerLeft :<Icon name='menu' size={24} color='white'
    onPress={()=> navigation.toggleDrawer()}/>

  })
});
  const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon :({Tintcolor})=>(
            <Icon name='home' type='font-Awesome' size={24} color='#512DA8'/>
          )
        }
      },
      Aboutus:{
        screen:AboutNavigator,
        navigationOptions:{
          title: 'About us',
          drawerLabel:'About us',
          drawerIcon :({Tintcolor})=>(
            <Icon name='info-circle' type='font-Awesome' size={24} color='#512DA8'/>)
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon :({Tintcolor})=>(
            <Icon name='list' type='font-Awesome' size={24} color='#512DA8'/>)
        }, 
      },

Contactus:
 {
  screen:ContactNavigator,
    navigationOptions: {
    title: 'Contactus',
    drawerLabel: 'Contact us',
    drawerIcon :({Tintcolor})=>(
      <Icon name='Address-card' type='font-Awesome' size={22} color='#512DA8'/>) 
  },
} },{
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomdrawContentCompomnent
});

class Main extends Component {
 

  render() {
 
    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
        </View>
    );
  }
}
const styles=StyleSheet.create({
Container:
{
  flex:1
},
drawerImage:
{
width:80,
height:60,
margin:10,
},
drawHeader:
{
  backgroundColor:'#512DA8',
  alignItems:'center',
  height:140,
  justifyContent:'center',
  flex:1,
  flexDirection:'row'

},drawText:
{
  color:'white',fontSize:24,
  fontWeight:'bold',

}


}

)
  
export default Main;