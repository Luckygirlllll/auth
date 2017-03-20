import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {Header, Button, Spinner} from './component/common';
import LoginForm from './component/LoginForm';


class App extends Component {

    state = { loggedIn : null};

    componentWillMount(){
        firebase.initializeApp({
                                   apiKey: 'AIzaSyDua4ngOf2rQBuv8PvF637UoJZM_uQ77wI',
                                   authDomain: 'auth-ef00f.firebaseapp.com',
                                   databaseURL: 'https://auth-ef00f.firebaseio.com',
                                   storageBucket: 'auth-ef00f.appspot.com',
                                   messagingSenderId: '491936955853'
                                 });

        firebase.auth().onAuthStateChanged((user) => {

            if(user)
            {
            this.setState({loggedIn:true});
            } else {
            this.setState({loggedIn:false});
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn){
            case true:
            return (
                        <Button style={styles.buttonStyle} onPress= { ()=> firebase.auth().signOut()}>
                            Log Out
                        </Button>
                        );
            case false:
             return <LoginForm/>;
            default:
                return <Spinner size='large'/>;
        }
    }


    render() {
     return (
        <View>
            <Header headerText='Authentication'/>
            {this.renderContent()}
        </View>
    );
    };
}

const styles = {
    buttonStyle:{
        marginTop:500,
//        flex:1,
        position: 'relative',
        justifyContent:'center'
//        alignItems:'center'

    }
};




export default App;
