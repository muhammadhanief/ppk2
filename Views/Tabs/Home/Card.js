import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import httpClient from "../../../httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

type CardsComponentsProps = {};

const Cards: React.FunctionComponent<CardsComponentsProps> = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      httpClient
        .getAllKonten()
        .then((konten) => {
          konten.forEach((konten) => {
            // konten.content = konten.content.substring(0, 100);
            konten.content = konten.kondisi;
          });
          setData(konten);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])
  );

  return (
    <>
      <ScrollView>
        <View>
          <Card
            containerStyle={{
              margin: 0,
              marginTop: 3,
              padding: 10,
              //   alignSelf: "center",
              //   alignSelf: "stretch",
              backgroundColor: "yellow",
              //   alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginBottom: 8,
                alignSelf: "center",
              }}
            >
              List Barang
            </Text>
          </Card>

          {data.map((item, index) => (
            <Card
              key={index + 1}
              containerStyle={{ margin: 0, marginTop: 3, padding: 10 }}
            >
              <Text
                onPress={() =>
                  navigation.navigate("Details", {
                    itemId: item.id,
                  })
                }
                style={styles.header}
              >
                {item.nama_barang}
              </Text>
              <Text
                onPress={() =>
                  navigation.navigate("Details", {
                    itemId: item.id,
                  })
                }
                style={styles.description}
              >
                {item.content}
              </Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
});

export default Cards;
