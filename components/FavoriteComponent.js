import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';



const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
    
  }
  

  class Favorites extends Component{
    static navigationOptions = {
        title: 'My Favorites'
    };
    render()
    {
        const {navigate}= this.props.navigation;
  const renderListItem=({item,index})=>{

    return(<ListItem
      key={index
      }
      leftAvatar={{
          source:{uri:baseUrl+item.image}}
      }
      title={item.name}
      subtitle={item.description}
      onPress={()=>navigate('Dishdetail', { dishId: item.id })}
      hidechevron={true}/>);
    };
    if (this.props.dishes.isLoading) {
        return(
            <Loading />
        );
    }
    else if (this.props.dishes.errMess) {
        return(
            <View>            
                <Text>{this.props.dishes.errMess}</Text>
            </View>            
        );
    }
    else {
        return (
            <FlatList 
                data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                renderItem={renderListItem}
                keyExtractor={item => item.id.toString()}
                />
        );
    }


        
    }
  }
  export default connect(mapStateToProps)( Favorites);