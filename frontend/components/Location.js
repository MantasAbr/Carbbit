import React from 'react';
import { Button } from 'react-native';

const getLocation = props => {
    return(
        <Button tittle="Get Location" onPress = {props.onGetLocation} />
    );
}

export default getLocation;