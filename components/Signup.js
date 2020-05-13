import React, { Component } from 'react';
import axios from 'axios';
import * as Location from 'expo-location';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

export default class Search extends Component {

  state = {
    volunteername: '',
    password: '',
    email: '',
    phonenumber: '',
    latitude: '',
    longitude: ''
  }

  postData = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ setErrorMsg: 'Access location was denied' })
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(location);
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    const volunteer = {
      volunteername: this.state.volunteername,
      password: this.state.password,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
      latitude: latitude,
      longitude: longitude
    }
   console.log(volunteer);

  axios.post('https://dry-waters-16739.herokuapp.com/volunteers/add', volunteer)
      //.then(res => res.json())
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => { console.log(err) });
    this.setState({
      volunteername: '',
      password: '',
      email: '',
      phonenumber: '',
      latitude: '',
      longitude: ''
    });
    this.props.navigation.navigate('SignIn')
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View
          style={styles.container}>
          <Text style={styles.title}>SignUp Volunteer</Text>

          <TextInput
            style={styles.TextInput}
            placeholder="Volunteer name"
            value={this.props.volunteername}
            onChangeText={(text) => this.setState({ volunteername: text })}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            value={this.props.password}
            onChangeText={(text) => this.setState({ password: text })}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="email"
            value={this.props.email}
            onChangeText={(text) => this.setState({ email: text })}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Phone number"
            value={this.props.phonenumber}
            onChangeText={(number) => this.setState({ phonenumber: number })}
          />
          <TouchableOpacity style={styles.button}
            onPress={this.postData}>
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>


        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#48BBEC',
    justifyContent: 'center',
    padding: 40,
  },
  title: {
    marginBottom: 10,
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
    borderWidth: 10,
    borderRadius: 10,
    borderColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});
