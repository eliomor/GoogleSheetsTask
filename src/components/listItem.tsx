import React from 'react';
import { View, Text } from 'react-native';

import { Item } from '~/types';

interface ListItemProps {
  item: Item;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const textStyle = {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'AmericanTypewriter-Bold',
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          backgroundColor: item.svg.fill,
          height: 16,
          width: 30,
        }}
      />
      <View style={{ flexDirection: 'row', paddingLeft: 15 }}>
        <View style={{ flex: 1 }}>
          <Text style={textStyle}>age : {item.key}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={textStyle}>count : {item.value}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ ...textStyle, paddingLeft: 10 }}>
            percent : {item.percent}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ListItem;
