import React,{ Component } from 'react';
import { ScrollView,View,Text ,FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';;
import {baseUrl} from'../shared/baseUrl';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

function History () {
    return(<Card
       title='Our History'
       featuredTitle='Contact Information'>
       <View style={{backgroundColor:'#ffff'}}>
           <Text style={{margin: 10}}>
            Started in 2010, Ristorante con Fusion quickly established itself
            as a culinary icon par excellence in Hong Kong. 
            With its unique brand of world fusion cuisine that can be found nowhere else,
             it enjoys patronage from the A-list clientele in Hong Kong.
             Featuring four of the best three-star Michelin chefs in the world,
            you never know what will arrive on your plate the next time 
            you visit us.{"\n"}{"\n"}
            The restaurant traces its humble beginnings to The Frying Pan,
              a successful chain started by our CEO, Mr. Peter Pan,
          that featured for the first time the world's best cuisines in a pan.
              
               </Text></View>
   </Card>);}   
    
 
class Aboutus extends Component{

   
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
                        leftAvatar={{ source:{uri: baseUrl + item.image}}}
                    
                      />
            );
        }
        
            return (<ScrollView classname='container'>
                               <View classname='card1'>
                                   <History/></View>
                                     <View classname='card2'>
                                           <Card title='Corporate Leadership'>
                                            <FlatList 
                                                  data={this.props.leaders.leaders}
                                                   renderItem={renderListItem}
                                                   keyExtractor={item => item.id.toString()}
                                                         /></Card></View></ScrollView>
            );
        }
}

export default connect(mapStateToProps)(Aboutus);