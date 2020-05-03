import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../constants/Colors';

export default function FontAwesomeIcon(props, sizeOf, colorOf){
    return(
        <FontAwesome
            name={props.name}
            size={props.sizeOf}
            color={Colors.colorOf}
            style={props.style}
        />
    )
}