import React,{ Component } from 'react';
import { ScrollView,View,Text ,FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import { Loading } from './LoadingComponent';
import {baseUrl} from'../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

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
        const renderLeader= ({item, index}) => {

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
        if (this.props.leaders.isLoading) {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                    </Animatable.View>
                </ScrollView>
            );
        } else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                    <FlatList 
                        data={this.props.leaders.leaders}
                        renderItem={renderLeader}
                        keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
    }
        
}

export default connect(mapStateToProps)(Aboutus);