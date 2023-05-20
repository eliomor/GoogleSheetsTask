import React from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import axios from 'axios';

import { Item } from '~/types';
import { dataFormatter, randomColor } from '../logic';

import CustomPieChart from '../components/customPieChart';
import ListItem from '../components/listItem';

const API_KEY = 'AIzaSyCzR95AeE8NTKG_odhZEkM27ECas9ZImjI';
const SPREADSHEET_ID = '1cK7WCG7S1OVlZ9YPWbSLVFWGuNeWyHFkkDBRlOkhF2Y';
const RANGE = 'aabbcc';

const fetchGoogleSheetsData = async () => {
  try {
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`,
    );
    console.log(response);

    return dataFormatter(response.data.values);
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const GoogleSheet = () => {
  const { isLoading, isFetching, isError, data, refetch } = useQuery(
    'googleSheetsData',
    fetchGoogleSheetsData,
  );

  if (isLoading || isFetching) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error fetching shop items</Text>
      </View>
    );
  }
  const handleClick = () => {
    refetch();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: randomColor() }}>
        <FlatList<Item>
          style={{ paddingHorizontal: 15 }}
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <ListItem item={item} />}
        />
      </View>

      <View style={{ backgroundColor: randomColor(), flex: 1 }}>
        <CustomPieChart data={data} />
      </View>
      <Button title="Refetch Data" onPress={handleClick} />
    </View>
  );
};

export default GoogleSheet;
