import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constants/Colors';

export default function IonicsIcon(props, sizeOf, colorOf){
    return(
        <Ionicons
            name={props.name}
            size={props.sizeOf}
            color={Colors.colorOf}
        />
    );
}