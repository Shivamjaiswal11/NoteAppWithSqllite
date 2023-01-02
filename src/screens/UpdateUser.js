import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  ToastAndroid,
} from "react-native";
import COLORS from "../../constant/Theme";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Loader from "../../component/Loader";
import { useNavigation, useRoute } from "@react-navigation/native";
// import {openDatabase} from 'react-native-sqlite-storage';
import * as SQLite from "expo-sqlite";
var db = SQLite.openDatabase("db.db");
const UpdateUser = ({ navigation }) => {
  //   const [inputs, setInputs] = React.useState(route?.params?.data?.title,route?.params?.data?.Desc );
  const [title, settitle] = useState(route?.params?.data?.title);
  const [Desc, setDesc] = useState(route?.params?.data?.Desc);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  // const [data, setdata] = React.useState('')
  // console.log(data)
  const route = useRoute();
  console.log(route.params.data);
  const updateNote = () => {
    setLoading(true);
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE table_user set title=?,Description=? where user_id=?",
        [title, Desc, route.params.data.id],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            // Alert.alert(
            //   'Success',
            //   'Note updated successfully',
            //   [
            //     {
            //       text: 'Ok',
            //       onPress: () => navigation.navigate('Home'),
            //     },
            //   ],
            //   {cancelable: false},
            // );
            setLoading(false);
            navigation.navigate("Home");
          } else alert("Updation Failed");
        }
      );
    });
  };
  //   Get data from route
  React.useEffect(() => {
    // setInputs(route?.params?.data?.title,route?.params?.data?.Desc)
    setDesc(route?.params?.data?.Desc);
    settitle(route?.params?.data?.title);
    // setName(route.params.data.name);
    // setEmail(route.params.data.email);
    // setAddress(route.params.data.address);
  }, []);

  //    console.log(inputs)
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!title) {
      handleError("Please input title", "title");
      isValid = false;
    }
    if (!Desc) {
      handleError("Please input Desc", "Desc");
      isValid = false;
    }
    if (isValid) {
      updateNote();
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Edit Note
        </Text>
        {/* <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Login
        </Text> */}
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => settitle(text, "title")}
            onFocus={() => handleError(null, "title")}
            iconName="title"
            label="Title"
            placeholder="Enter your title"
            error={errors.title}
            value={title}
          />
          {/* {inputs.email == data.email ? (<Text>hii</Text>):null } */}
          <Input
            onChangeText={(text) => setDesc(text, "Desc")}
            onFocus={() => handleError(null, "Desc")}
            iconName="description"
            label="Description"
            placeholder="Enter your Desc"
            error={errors.Desc}
            value={Desc}
            mutline={true}
            // style={{height:100}}
            desc
            // password
          />
          <Button title="Update Note" isPrimary onPress={validate} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;
