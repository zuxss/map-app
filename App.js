import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";

export default function App() {
  const [origin, setOrigin] = React.useState({
    latitude: 33.4412412,
    longitude: 33.123123,
  });
  React.useEffect(() => {
    getLocationPermission();
  }, []);

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Denegado");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(current);
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker draggable coordinate={origin} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
