import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ScrollView,
  Button,
  StatusBar,
  Image,
} from "react-native";

import locations from "./importantLocations";

export default function App() {
  const [origin, setOrigin] = useState({
    latitude: 33.4412412,
    longitude: 33.123123,
  });

  useEffect(() => {
    getLocationPermission();
  }, []);

  function getLocationSangu(lugar) {
    const coordenada = {
      latitude: lugar.latitude,
      longitude: lugar.longitude,
    };
    setOrigin(coordenada);
  }
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
      <StatusBar></StatusBar>
      <View>
        <Image
          source={require("./assets/Map-Milas2.png")}
          style={{ width: Dimensions.get("window").width, height: 100 }}
        ></Image>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.09,
        }}
        region={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={origin} />
        {locations.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.name}
            description={marker.description}
          ></Marker>
        ))}
      </MapView>

      <ScrollView>
        <View key="home" style={styles.listItem}>
          <Text style={{ color: "white" }}>Ubicación Actual</Text>
          <Button title="Ir" onPress={getLocationPermission}></Button>
        </View>
        {locations.map((marker) => (
          <View key={marker.id} style={styles.listItem}>
            <Text style={{ color: "white" }}>{marker.name}</Text>
            <Button
              key={marker.id}
              title={"Ir"}
              onPress={() => {
                getLocationSangu(marker);
              }}
            ></Button>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  map: {
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.5,
    marginBottom: 10,
  },

  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "white",
    width: "100%",
    backgroundColor: "black",
    margin: 5,
  },
});
