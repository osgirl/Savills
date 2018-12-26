import React from 'react';
import { View, Text, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
export default ({ language }) => {
  const week_localized = language;
  return (
    <View
      style={{
        width,
        height: 30,
        flexDirection: 'row'
      }}
    >
      {week_localized.map(day => (
        <View
          style={{
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          key={day}
        >
          <Text
            style={{
              color: '#FFF',
              fontSize: 12
            }}
          >
            {day}
          </Text>
        </View>
      ))}
    </View>
  );
};
