import * as React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';

export default function MaterialIcon(props, sizeOf, colorOf){
    return(
        <MaterialCommunityIcons
            name={props.name}
            size={props.sizeOf}
            color={Colors.colorOf}
            style={props.style}
        />
    )
}