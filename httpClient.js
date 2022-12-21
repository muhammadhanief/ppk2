import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const API_LINK = process.env.VITE_API_LINK;
const httpClient = axios.create();

// create an interceptor that will run before every request
httpClient.defaults.withCredentials = true;

//get token from local storage
httpClient.getToken = async function () {
  try {
    return await AsyncStorage.getItem("@storage_Key");
  } catch (error) {
    console.log(error);
  }
};

//set token to local storage and return it
httpClient.setToken = async function (token, id) {
  // save to keychain
  try {
    await AsyncStorage.setItem("@storage_Key", token);
    id = id.toString();
    await AsyncStorage.setItem("@storage_id", id);
  } catch (e) {
    // saving error
  }
};

// get all users
httpClient.getAllUsers = function () {
  return this({
    method: "get",
    url: "https://beppk.vercel.app/api/users",
    // url: "http://sialumni.masuk.id/api/users",
  }).then((serverResponse) => {
    return serverResponse.data;
  });
};

// delete user
httpClient.deleteUser = function (nama) {
  return this({
    method: "delete",
    url: "https://beppk.vercel.app/api/users/" + nama,
    // url: "http://sialumni.masuk.id/api/users/" + nama,
  }).then((serverResponse) => {
    return serverResponse.data;
  });
};

//update user
httpClient.updateUser = function (nama, data) {
  console.log("masuk update");
  return this({
    method: "put",
    // url: "https://beppk.vercel.app/api/users/" + nama,
    url: "http://sialumni.masuk.id/api/profileupdateapi",
    data: data,
  }).then((serverResponse) => {
    return serverResponse.data;
  });
};

httpClient.logIn = function (credentials) {
  return this({
    method: "post",
    // url: "https://beppk.vercel.app/api/users/authenticate/",
    url: "http://sialumni.masuk.id/api/login",
    data: credentials,
  }).then(async (serverResponse) => {
    const token = serverResponse.data.token;
    const id = serverResponse.data.user.id;
    // set the token in keychain
    await this.setToken(token, id).then((r) => {
      console.log(AsyncStorage.getItem("token"));
    });
    return serverResponse.data;
  });
};

// logIn and signUp functions could be combined into one since the only difference is the url we're sending a request to..
httpClient.signUp = function (userInfo) {
  return this({
    method: "post",
    // url: "https://beppk.vercel.app/api/users",
    // url: "http://sialumni.masuk.id/api/users/",
    url: "http://sialumni.masuk.id/api/register",
    // url: "http://sialumni.masuk.id/api/registerabalabal",
    data: userInfo,
  }).then(async (serverResponse) => {
    const token = serverResponse.data.token;
    // set the token in keychain
    await this.setToken(token).then((r) => {
      console.log(AsyncStorage.getItem("token"));
    });
    return serverResponse.data;
  });
};

httpClient.cariUser = function (id) {
  return this({
    method: "get",
    // url: "https://beppk.vercel.app/api/users/" + username,
    // url: "http://sialumni.masuk.id/api/users/" + username,
    url: "http://sialumni.masuk.id/api/cariUser?id=" + id,
  }).then((serverResponse) => {
    return serverResponse.data;
  });
};

// sampai sini

// httpClient.logOut = function() {
// 	localStorage.removeItem('token')
// 	delete this.defaults.headers.common.token
// 	return true
// }

httpClient.createKonten = function (konten) {
  return this({
    method: "post",
    // url: "https://beppk.vercel.app/api/konten",
    url: "https://sialumni.masuk.id/api/tambah-barang",
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    data: konten,
  }).then((serverResponse) => {
    return serverResponse.data;
  });
};
httpClient.getAllKonten = function () {
  return this({
    method: "get",
    // url: "https://beppk.vercel.app/api/konten",
    url: "http://sialumni.masuk.id/api/barang",
  }).then((serverResponse) => {
    return serverResponse.data;
  });
};
httpClient.getKontenById = function (id) {
  return this({
    method: "get",
    // url: "https://beppk.vercel.app/api/konten/" + id,
    url: "http://sialumni.masuk.id/api/caribarang?id=" + id,
  }).then((serverResponse) => {
    return serverResponse.data;
  });
};
httpClient.deleteKontenById = function (id) {
  return this({
    method: "delete",
    url: "https://beppk.vercel.app/api/konten/" + id,
  }).then((serverResponse) => {
    return serverResponse.data;
  });
};
httpClient.updateKontenById = function (id, konten) {
  return this({
    method: "patch",
    url: "https://beppk.vercel.app/api/konten/" + id,
    data: konten,
  }).then((serverResponse) => {
    return serverResponse.data;
  });
};
httpClient.cariEmail = function (email) {
  return this({
    method: "get",
    url: "https://beppk.vercel.app/api/users/email/" + email,
  }).then((serverResponse) => {
    return serverResponse.data;
  });
};

// token is automatically sent with every request
// httpClient.defaults.headers.common.token = httpClient.getToken()

export default httpClient;
