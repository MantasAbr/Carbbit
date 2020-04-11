import * as React from 'react';
import { Text } from 'react-native';

export function TitilliumWeb(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'titillium-web' }]} />;
}
