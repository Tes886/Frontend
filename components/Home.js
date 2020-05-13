import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import * as Permissions from 'expo-permissions';
import axios from 'axios';

import Volunteers from './VolunterMarker'

import MapView, { Marker } from 'react-native-maps'

//const locations = require('../locations.json')
const { width, height } = Dimensions.get('screen')

export default class App extends React.Component {



  state = {
    data: [],

  }

  async componentDidMount() {

    this.fetchVolunteers();

    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }),
      (error) => console.log('Error:', error)
    )

    const { locations: [sampleLocation] } = this.state

    this.setState({
      desLatitude: sampleLocation.coords.latitude,
      desLongitude: sampleLocation.coords.longitude
    })
  }

  fetchVolunteers() {
    return axios.get('https://dry-waters-16739.herokuapp.com/volunteers')
      //  .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        this.setState({
          data: data.data,
        });
      })
      .catch((err) => { console.log(err); });
  }


  render() {

    const {
      latitude,
      longitude,
    } = this.state
  
    this.token = null
    if (this.props.route.params) {
      this.token = this.props.route.params.data
    }
    return (
      <>
        <MapView
          showsUserLocation
          style={styles.mapStyle}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Volunteers lists={this.state.data} />

        </MapView>
        <View
          style={styles.view}>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
            COVID-19 Volunteer Spots</Text>
        </View>
        {this.token && <TouchableOpacity onPress={() => {
          this.token = null
          this.props.navigation.navigate('SignIn',)
        }}
          style={styles.signoutButton}>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
            SignOut</Text>
        </TouchableOpacity>}
      </>
    );

  }
}

const styles = StyleSheet.create({

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  view: {
    position: "absolute",
    top: 50,
    left: 50,
    alignItems: "center",
    justifyContent: "center"

  },
  signoutButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    alignItems: "center",
    justifyContent: "center"

  }
});