import React, { useMemo, useCallback }   from 'react';
import { View, Text }                    from 'react-native';
import { enableScreens }                 from 'react-native-screens';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer }           from '@react-navigation/native';

enableScreens(true);

const Tab = createMaterialTopTabNavigator();

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

export default function App() {
  const pageData = useMemo(() => {
    const ids = Array.from(Array(30).keys());

    return ids.map(id => {
      return {
        id,
        color: getRandomColor()
      };
    });
  }, []);

  const renderPages = useCallback(() => {
    return pageData.map(page => (
      <Tab.Screen
        key={page.id}
        name={`page-${page.id}`}
      >
        {() => (
          <View style={{
            height: '100%',
            width: '100%',
            backgroundColor: page.color,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: 48 }}>Page {page.id}</Text>
          </View>
        )}
      </Tab.Screen>
    ));
  }, [ pageData ]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={() => null}
        backBehavior="none"
        screenOptions={{
          lazy: true,
          lazyPreloadDistance: 1,
          swipeEnabled: true,
        }}
      >
        { renderPages() }
      </Tab.Navigator>
    </NavigationContainer>
  );
}