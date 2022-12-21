import {
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
  View,
  Pressable,
} from "react-native";
import ProfileTab from "./Profile";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { StyleSheet, StatusBar, Image } from "react-native";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import { createRef, useCallback, useEffect, useState } from "react";
import { Button, Overlay } from "@rneui/themed";
import isEmail from "validator/lib/isEmail";
import httpClient from "../../httpClient";
import { useFocusEffect } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

function Create({}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
        },
        gestureDirection: "horizontal",
        gestureEnabled: true,
        headerShown: true,
        animation: "slide_from_right",
        // time speed of animation
        animationTypeForReplace: "pop",
        animationDuration: 10,
      }}
    >
      <Stack.Screen name="Tambah Barang" component={CreateDetails} />
    </Stack.Navigator>
  );
}

function CreateDetails(navigation) {
  const _editor = createRef();

  const [visible, setVisible] = useState(false);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [jumlah, setjumlah] = useState("");
  //   const [status, setstatus] = useState("");
  const [tahun_beli, settahun_beli] = useState("");
  const [sumber_dana, setsumber_dana] = useState("");

  const [imageGallery, setImageGallery] = useState(null);

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const options = {
    title: "Select Image",
    type: "library",
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: true,
      // includeExtra,
    },
  };

  const openGallery = () => {
    const option = {
      mediaType: "photo",
      quality: 1,
    };
    launchImageLibrary(option, (res) => {
      if (res.didCancel) {
        console.log("User Cancelled image picker");
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        const data = res.assets[0];
        setImageGallery(data);
        console.log(data);
      }
    });
  };

  const onChangeTitle = (text) => {
    setTitle(text);
  };
  const clearContent = () => {
    setValue("");
    setTitle("");
    setjumlah("");
    _editor.current?.setContents([{ insert: "" }]);
  };
  useFocusEffect(
    useCallback(() => {
      clearContent();
    }, [])
  );

  const toggleOverlay = () => {
    // _editor.current?.getHtml().then((html) => {
    //   setValue(html);
    // });
    // if (title === "") {
    //   alert("Please fill all fields");
    //   return;
    // }
    setVisible(!visible);
  };
  const confirmUpload = () => {
    let data = {
      nama_barang: title,
      kondisi: value,
      jumlah: jumlah,
      tahun_beli: tahun_beli,
      sumber_dana: sumber_dana,
      //   status: status,
      keterangan: keterangan,
      // gambar: image,
    };
    httpClient.createKonten(data).then((res) => {
      setVisible(!visible);
      alert("Success");
      //delete _editor.current;
      setTitle("");
      setValue("");
      setjumlah("");
      settahun_beli("");
      setsumber_dana("");
      setketerangan("");
    });
    _editor.current?.setContents([{ insert: "" }]);
  };
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.label}>Nama Barang</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={onChangeTitle}
            placeholder="Nama Barang"
          />

          <Text style={styles.label}>Kondisi</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            placeholder="Kondisi"
          />

          <Text style={styles.label}>Jumlah</Text>
          <TextInput
            style={styles.input}
            value={jumlah}
            onChangeText={setjumlah}
            placeholder="Jumlah"
          />

          <Text style={styles.label}>Tahun Beli</Text>
          <TextInput
            style={styles.input}
            value={tahun_beli}
            onChangeText={settahun_beli}
            placeholder="Title"
          />

          <Text style={styles.label}>Sumber Dana</Text>
          <TextInput
            style={styles.input}
            value={sumber_dana}
            onChangeText={setsumber_dana}
            placeholder="Sumber Dana"
          />

          {/* <Text style={styles.label}>Status</Text>
          <TextInput
            style={styles.input}
            value={status}
            onChangeText={setstatus}
            placeholder="Title"
          /> */}

          <Text style={styles.label}>Keterangan</Text>
          <TextInput
            style={styles.input}
            value={keterangan}
            onChangeText={setketerangan}
            placeholder="Keterangan"
          />

          {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )} */}
          {/* <Pressable onPress={openGallery}>
            <Text>Open Gallery</Text>
          </Pressable> */}
        </SafeAreaView>
      </ScrollView>
      <StatusBar style="auto" />

      {/* <Text style={styles.label1}>Kondisi</Text>
      <QuillEditor
        style={styles.editor}
        ref={_editor}
        value={value}
        onChange={setValue}
        placeholder="Write something..."
        theme="snow"
      />
      <QuillToolbar editor={_editor} options="full" theme="light" /> */}

      {/* </SafeAreaView> */}

      <Button size="md" style={styles.button} onPress={toggleOverlay}>
        Upload Barang
      </Button>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <SafeAreaView>
          <View style={styles.overlay}>
            <Text style={styles.titleoverlay}>Upload Konten ?</Text>
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
                onPress={confirmUpload}
              >
                Upload
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </Overlay>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
  label: {
    marginBottom: 5,
    color: "#4d4d4d",
  },
  label1: {
    marginBottom: 5,
    color: "#4d4d4d",
    marginLeft: 25,
  },
  inputContainer: {
    padding: 25,
    paddingBottom: 5,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: "#d3d3d3",
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 25,
    marginVertical: 5,
    backgroundColor: "white",
  },
});
export default Create;
