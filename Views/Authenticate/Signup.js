import React, { useCallback, useEffect, useState } from "react";
import httpClient from "../../httpClient";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import logo from "../../logo.png";
import { Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import isEmail from "validator/lib/isEmail";

function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const getUser = async () => {
    const value = await AsyncStorage.getItem("@storage_Key");
    if (value != null) {
      navigation.navigate("Home");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );
  useEffect(() => {
    if (
      username.length > 0 &&
      password.length > 0 &&
      email.length > 0 &&
      namaLengkap.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [username, password, email, namaLengkap, confirmPassword]);

  const onChangeUsername = (text) => {
    setUsername(text);
  };
  const onChangeNamaLengkap = (text) => {
    setNamaLengkap(text);
  };
  const onChangePassword = (text) => {
    setPassword(text);
  };
  const onChangeEmail = (text) => {
    setEmail(text);
  };
  const onChangeConfirmPassword = (text) => {
    setConfirmPassword(text);
  };

  const signupAuth = () => {
    if (!isEmail(email)) {
      alert("Email tidak valid");
      return;
    }
    const data = {
      username: username,
      password: password,
      email: email,
      nama: namaLengkap,
      password_confirmation: password,
      // role: "member",
    };
    httpClient
      .signUp(data)
      .then((res) => {
        if (res.token) {
          navigation.navigate("Home", { screen: "Feed" });
        } else {
          alert("Sign Up Failed, Check your username and password");
        }
      })
      .catch((err) => {
        alert("Sign Up Failed, Check your username and password");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inside1}></View>
      <View style={styles.inside2}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "http://www.gpacheby.org/wp-content/uploads/2018/09/cheby-logo-1024x549.jpg",
          }}
        />
        <Text>{"\n"}</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput
          selectionColor={"#118bd2"}
          style={styles.input}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Username"
        />
        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput
          selectionColor={"#118bd2"}
          style={styles.input}
          onChangeText={onChangeNamaLengkap}
          value={namaLengkap}
          placeholder="Nama Lengkap"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          selectionColor={"#118bd2"}
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          selectionColor={"#118bd2"}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          selectionColor={"#118bd2"}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={onChangeConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
        />
        <Button
          disabled={isDisabled}
          disabledStyle={{
            backgroundColor: "#118bd2",
            opacity: 0.5,
          }}
          onPress={signupAuth}
          radius="md"
          size="lg"
          style={styles.button}
        >
          Sign Up
        </Button>
      </View>
      <View style={styles.inside3}>
        <Button
          onPress={() => navigation.push("Login")}
          color="white"
          type="clear"
          radius="none"
          size="lg"
          style={styles.buttonSign}
          containerViewStyle={{ width: "100%" }}
        >
          <Text style={{ color: "black" }}>
            Already have an account?
            <Text style={{ color: "#118bd2" }}> Log in here</Text>
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    color: "#4d4d4d",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 45,
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
    marginLeft: 20,
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

export default Signup;
