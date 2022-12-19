import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { Avatar, Button, Overlay, Text } from "@rneui/themed";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { useFocusEffect } from "@react-navigation/native";
import httpClient from "../../httpClient";
import isEmail from "validator/lib/isEmail";

function ProfileTab({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [username, setUsername] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const getUser = async () => {
    // const value = await AsyncStorage.getItem("@storage_Key");
    const valueid = await AsyncStorage.getItem("@storage_id");
    setId(valueid);
    if (valueid !== null) {
      //   const user = jwtDecode(value).username;
      httpClient.cariUser(valueid).then((response) => {
        setUsername(response.username);
        setNama(response.nama);
        setEmail(response.email);
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  const onChangeNama = (text) => {
    setNama(text);
  };
  const onChangeEmail = (text) => {
    setEmail(text);
  };
  const confirmUpdate = () => {
    toggleOverlay();
    let data = {
      nama: nama,
      email: email,
      id: id,
    };
    httpClient
      .updateUser(username, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleOverlay = () => {
    if (isEmail(email)) {
      setVisible(!visible);
    } else {
      alert("Email tidak valid");
    }
  };
  const toggleOverlay2 = () => {
    setVisible2(!visible2);
  };
  const logOut = () => {
    setVisible2(!visible2);
  };
  const confirmLogOut = async () => {
    setVisible2(!visible2);
    await AsyncStorage.clear();
    await AsyncStorage.removeItem("@storage_Key");
    setNama("");
    setEmail("");
    setUsername("");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          size="xlarge"
          rounded
          source={{
            uri: "https://iili.io/HxEAzJf.jpg",
          }}
        />
      </View>

      <View style={styles.inside2}>
        {/*label*/}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          placeholder="Username"
          editable={false}
        />
        <Text style={styles.label}>Nama</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNama}
          value={nama}
          placeholder="Nama Lengkap"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
        />
        <Button
          radius="md"
          size="lg"
          style={styles.button}
          onPress={toggleOverlay}
        >
          Update Data
        </Button>
        <Button
          radius="md"
          buttonStyle={{
            backgroundColor: "#ffffff",
            borderWidth: 1.5,
            borderColor: "rgba(199, 43, 98, 1)",
            marginTop: 10,
          }}
          color="error"
          type={"outline"}
          size="lg"
          onPress={logOut}
        >
          <Text
            style={{
              color: "rgba(199, 43, 98, 1)",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Log Out
          </Text>
        </Button>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <SafeAreaView>
            <View style={styles.overlay}>
              <Text style={styles.titleoverlay}>Update Data ?</Text>
              <View style={styles.buttonoverlay}>
                <Button
                  radius="md"
                  buttonStyle={{
                    marginHorizontal: 20,
                  }}
                  type="clear"
                  size="sm"
                  style={styles.buttonoverlay2}
                  onPress={toggleOverlay}
                >
                  Cancel
                </Button>
                <Button
                  radius="md"
                  type="clear"
                  size="sm"
                  style={styles.buttonoverlay1}
                  onPress={confirmUpdate}
                >
                  Update
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </Overlay>
        <Overlay isVisible={visible2} onBackdropPress={toggleOverlay2}>
          <SafeAreaView>
            <View style={styles.overlay}>
              <Text style={styles.titleoverlay}>
                Apakah anda yakin ingin keluar ?
              </Text>
              <View style={styles.buttonoverlay}>
                <Button
                  radius="md"
                  buttonStyle={{
                    marginHorizontal: 20,
                  }}
                  type="clear"
                  size="sm"
                  style={styles.buttonoverlay2}
                  onPress={toggleOverlay2}
                >
                  Cancel
                </Button>
                <Button
                  radius="md"
                  type="clear"
                  size="sm"
                  style={styles.buttonoverlay1}
                  onPress={confirmLogOut}
                >
                  Yes
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </Overlay>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    color: "#4d4d4d",
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  buttonoverlay: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  buttonoverlay1: {
    width: 100,
  },
  buttonoverlay2: {
    width: 100,
  },
  modalButton: {
    marginTop: 10,
    marginBottom: 10,
    width: 10,
  },
  titleoverlay: {
    fontSize: 15,
    marginBottom: 20,
  },
  overlay: {
    width: 300,
    padding: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#f8f8f8",
    borderColor: "#d3d3d3",
    width: "100%",
  },
  button: {
    width: "100%",
  },
  tinyLogo: {
    aspectRatio: 3,
    resizeMode: "contain",
    marginBottom: 5,
    marginLeft: 15,
  },
  inside3: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inside2: {
    padding: 25,
  },
  inside1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
export default ProfileTab;
