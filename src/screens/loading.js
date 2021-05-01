import React from 'react';
import { View, Text } from 'react-native';

const Loading = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginTop: 20, fontFamily: 'Poppins-Medium', fontSize: 25 }}>Loading  .  .  .</Text>
        </View>
    )
}

export default Loading;