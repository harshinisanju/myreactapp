import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';

import { Card,Icon,Rating,Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }
  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment:(dishId,newrating,author,newcomment)=>dispatch(postComment(dishId,newrating,author,newcomment))
})






function RenderDish(props) {
    const recognizeDragleft = ({ moveX, moveY, dx, dy }) => {
        if ( dx > 200 )
            return true;
        else
            return false;
    }
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
    
    handleViewRef = ref => this.view = ref;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},

        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
               else if(recognizeDragleft(gestureState))
                props.ModalComment();

            return true;
        }
    })

  

    const dish = props.dish;
    
        if (dish != null) {
            return(
                
            
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>

                    <View style={{ flexDirection: 'row',justifyContent:'center'}}>
                        <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    
                    <Icon 
                 raised
                 reverse
                 color='#512DA8'
                 name='pencil'
                 type='font-awesome'
                 onPress={()=>{props.ModalComment()}}/>
                
                    </View>
        
                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}
function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
            <Rating type='star' readonly ratingCount={5} startingValue={item.rating} imageSize={10} style={{alignSelf: 'flex-start', marginTop: 10, marginBottom: 10}} />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>        
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
        </Animatable.View>
    );
}
class  Dishdetail extends Component {
    constructor(props)
    {
        super(props)
 
         this.state = {
             comments:props.comment,
             isVisible: false, 
             newcomment:'',
             author:'',
             newrating:1,
         
       }
    }  
      handleComment(dishId)
      {
          this.props.postComment(dishId,this.state.rating,this.state.author,this.state.newcomment),
          this.togglemodal();
      }

        markFavorite(dishId) 
        {
            this.props.postFavorite(dishId);
        }
togglemodal()
{
    this.setState({isVisible:!this.state.isVisible});
}


static navigationOptions = {
    title: 'Dish detail'
};


  render(){
    const dishId = this.props.navigation.getParam('dishId','');
    return(
    <ScrollView><RenderDish dish={this.props.dishes.dishes[+dishId]}
    favorite={this.props.favorites.some(el => el === dishId)}
    onPress={() => this.markFavorite(dishId)}
    ModalComment={()=>this.togglemodal()}
    />


<Modal animationType = {"slide"} transparent = {false}
            visible = {this.state.isVisible}
            onRequestClose = {() =>{ console.log("Modal has been closed.") } }>

     <View style={{flexD:1,alignItems:'center',margin:10}}>
         
     <Rating type='star' showRating fractions="{1}" startingValue={this.state.newrating} name="newrating" onFinishRating={(rating) => this.setState({rating: rating })}/>
     <View style={{flexDirection:"row",
        justifyContent: 'center',
        margin: 10}}> 
     <Input
  placeholder='Author' name="author" onChangeText={(text) => this.setState({author: text})}leftIconContainerStyle={{ marginLeft: 0, marginRight: 10}}
  maxLength={100}
  leftIcon={{ type: 'font-awesome', name: 'user-o' }}
/></View>
<View style={{flexDirection:"row",
        justifyContent: 'center',
        margin: 10}}>

<Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o'}}
                            leftIconContainerStyle={{ marginLeft: 0, marginRight: 10}}
                            maxLength={100}
                            onChangeText={(text) => this.setState({newcomment: text})}
                            /></View>

         <View style={{ flexDirection:"row" ,justifyContent:"center",margin:10}}>
         <Button 
                            onPress={() => {this.handleComment(dishId)}}
                            color='#512DA8'
                            title='SUBMIT' /></View>

 <View style={{ justifyContent:"center",margin:10}}>
                  <Button size color="#C0C0C0"
            title="Cancel" onPress = {() => {this.togglemodal}}/></View>
            </View>
        </Modal>
    
    <RenderComments comments ={this.props.comments.comments.filter((comment)=> comment.dishId===dishId)}/></ScrollView>);
}}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);