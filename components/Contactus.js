import React,{ Component } from 'react';
import {View,Text}from 'react-native';
import {Card} from 'react-native-elements';
//import { isWhiteSpaceLike } from 'typescript';


class Contactus extends Component
{
    render()
    {
        return (
            <Card
            title='Contact Information'
            featuredTitle='Contact Information'>
            <View style={{backgroundColor:'#ffff'}}/>
                <Text style={{margin: 10}}>
                    121, Clear Water Bay Road{"\n"}{"\n"}
                    Clear Water Bay, Kowloon{"\n"}{"\n"}
                    HONG KONG{"\n"}{"\n"}
                    Tel: +852 1234 5678{"\n"}{"\n"}
                    Fax: +852 8765 4321{"\n"}{"\n"}
                    Email:confusion@food.net{"\n"}
                        
                    </Text>
            </Card>

        );
    }

}
export default Contactus;