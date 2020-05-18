import * as React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Colors from '../constants/Colors';

export default function FontAwesome5Icon(props, sizeOf, colorOf){
    return(
        <FontAwesome5
            name={props.name}
            size={props.sizeOf}
            color={Colors.colorOf}
            style={props.style}
        />
    )
}