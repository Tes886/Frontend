//import React from 'react';
import React, { Component } from 'react';
import axios from 'axios';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';

export default class SignIn extends Component {

    state = {
      email: '',
        password:'',
        
    }

    fetchData = () => {
      
        const email = this.state.email;
        const password = this.state.password;

        //console.log(username)
        axios.post('https://dry-waters-16739.herokuapp.com/volunteers/login', {email, password})
            .then(data => {
                this.props.navigation.navigate('NeedHelp',{data:data.data})
            })
            .catch((err)=>{console.log('Error')});
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View
                    style={styles.container}>
                    <Text style={styles.title}>SignIn Volunteer</Text>

                    <TextInput
                        style={styles.TextInput}
                        placeholder="Volunteer email"

                        value={this.props.volunteername}
                        onChangeText={(text) => this.setState({ email:text})}
                    />
                     <TextInput
                        style={styles.TextInput}
                        placeholder="Password"

                        value={this.props.password}
                        onChangeText={(text) => this.setState({password:text })}
                    />
                    <TouchableOpacity style={styles.button}
                        onPress={this.fetchData}>
                        <Text style={styles.buttonText}>SignIn</Text>
                    </TouchableOpacity>
                    <Button onPress={() => this.props.navigation.navigate("SignUp")} title="SignUp To Register"/>
                    
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#48BBEC',
        justifyContent: 'center',
        padding: 30,
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: 'white'
    },
    TextInput: {
        height: 50,
        padding: 5,
        marginRight: 5,
        fontSize: 22,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'white',
        color: 'white',
        marginTop: 10,

    },
    buttonText: {
        fontSize: 20,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});
