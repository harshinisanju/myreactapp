import React,{ Component } from 'react';
import { View,Text ,FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import {Card} from 'react-native-elements';
import { LEADERS } from '../shared/leaders';
import { DISHES } from '../shared/dishes';

function History () {
    return(<Card
       title='Our History'
       featuredTitle='Contact Information'>
       <View style={{backgroundColor:'#ffff'}}>
           <Text style={{margin: 10}}>
           Started in 2010, Ristorante con F    
               </Text></View>
   </Card>);}   
    
 
class Aboutus extends Component{
  
constructor(props)
{
    super(props);
    this.state={
        leaders :LEADERS

    };}
   
    static navigationOptions = {
        title: 'About us'
    };
    
    render()
    {
        const renderListItem = ({item, index}) => {

            return (
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        leftAvatar={{ source: require('./images/alberto.png')}}
                      />
            );
        }
        
            return (<View classname='container'>
                               <View classname='card1'>
                                   <History/></View>
                                     <View classname='card2'>
                                           <Card title='Corporate Leadership'>
                                            <FlatList 
                                                  data={this.state.leaders}
                                                   renderItem={renderListItem}
                                                   keyExtractor={item => item.id.toString()}
                                                         /></Card></View></View>
            );
        }
}

export default Aboutus;