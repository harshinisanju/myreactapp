
import React, { Component } from 'react'; 
import { Modal, Button, ScrollView,View,Text,Picker,Switch, StyleSheet,Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from'react-native-animatable';
{/*import { Permissions,Notifications} from 'expo';*/}
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import * as Calendar from 'expo-calendar';


export default class Reservation  extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            isVisible: false,
            value:'',
            results:[]
        }
        this.handleReservation=this.handleReservation.bind(this);
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    obtainCalendarPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
          permission = await Permissions.askAsync(Permissions.CALENDAR);
          if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to show notifications');
          }
        }
        return permission;
      };



    addReservationToCalendar = async (date)=> { 
        const permission = await this.obtainCalendarPermission();
        if (permission.status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            const defCalendars = calendars.filter((obj) => obj.allowsModifications === true);
                if (defCalendars) {
                    Calendar.createEventAsync(defCalendars[0].id,
                        {
                            title: 'Con Fusion Table Reservation',
                            startDate: new Date(Date.parse(date)),
                            endDate: new Date(Date.parse(date) + (2 * 60 * 60 * 1000)),
                            timeZone: 'Asia/Hong_Kong',
                            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'

                        }
                    );
                }
            }
        }


      
      
    

    
 
     /*showAlert = () =>{
      
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests +'{{\n}}'+'Smoking?:'+ this.state.smoking ? 'Yes' : 'No'+'{{\n}}'+'Date and Time:'+this.state.date
            [
                { 
                    text: 'Cancel', 
                    onPress: () =>{this.resetForm()},
                    style: ' cancel'
                },
                {
                    text: 'OK',
                    onPress: () =>{this.resetForm()}
                }
            ],
            { cancelable: false }
        
        
      )
   }*/
   handleReservation()
    {  this.state.value=this.state.smoking?'yes':'no';
        
    Alert.alert(  
        'Your Reservation OK?',  
        'No of Guests : '+this.state.guests+'\n'+'Smoking?:' +this.state.value+'\n'+'Date and Time: '+this.state.date,
        [  
            {  
                text: 'Cancel',  
                onPress: () => this.resetForm(),  
                style: 'cancel',  
            },  
            {text: 'OK', onPress: () => {
            this.presentLocalNotification(this.state.date)
    this.addReservationToCalendar(this.state.date)
            this.resetForm()}
            
            },  
        ]  
    );  
}  

  render() {
    return (
      <Animatable.View  animation="zoomIn" >
       {/*} <Modal animationType = {"slide"} transparent = {false}
            visible = {this.state.isVisible}
            onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
            <View style = {styles.modal}>
        <Text style = {styles.modalTitle}>Your Reservation</Text>
        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
        <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
              
              <Button  color="#512DA8"
            title="Close" onPress = {() => {
                  this.setState({ isVisible:!this.state.isVisible}),this.resetForm()}}/>
            </View>
            </Modal>*/}
        <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    onTintColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DatePicker
                    style={{flex: 2, marginRight: 20}}
                    date={this.state.date}
                    format=''
                    mode="datetime"
                    placeholder="select date and Time"
                    minDate="2017-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                </View>
                <View style={styles.formRow}>
               
                <Button  
                        onPress={this.handleReservation}  
                        title="RESERVE"
                        color='#512DA8'
                    />  
           </View>
           </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
     
});