import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import * as SMS from 'expo-sms';
import MapView, { Marker } from 'react-native-maps'

const VolunterMarker = (props) => {

    onPressSms = async (volunteerPhoneNum) => {

        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
            const { result } = await SMS.sendSMSAsync(
                [`${volunteerPhoneNum}`],
                'I need Help and volunteer COVID-19 worker, please reach me out on this address '
            );
        } else {
            // misfortune... there's no SMS available on this device
        }

    };

    return (
        props.lists.map((info, idx) => <Marker
            key={idx}
            coordinate={{ latitude: info.latitude, longitude: info.longitude }}
            title={info.volunteername}
            onPress={() => { this.onPressSms(info.phonenumber) }}
        >
            <FontAwesome5 name="sms" size={26} />
        </Marker>
        ))
}

export default VolunterMarker


