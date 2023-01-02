import React,{useEffect} from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  ToastAndroid,
  StatusBar,
} from "react-native";
import COLORS from "../../constant/Theme";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Loader from "../../component/Loader";
import { useIsFocused, useNavigation } from "@react-navigation/native";
// import {openDatabase} from 'react-native-sqlite-storage';
import * as SQLite from "expo-sqlite";
// var db = SQLite.openDatabase("Name.db");
const EditUser = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [inputs, setInputs] = React.useState({ title: "", Desc: "" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  // const [date,setDate]=React.useState(new Date().toLocaleString());

  // const [data, setdata] = React.useState('')
  // console.log(data)
  React.useEffect(()=>{
    openDatabase();

  },[])
  function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    const db = SQLite.openDatabase("db.db");
    return db;
  }
  
  const db = openDatabase();
  const AddNote = () => {
    // console.log( inputs.title, inputs.Desc);
    setLoading(true);
    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO table_user (title,Description,Date) VALUES (?,?,?)",
        [inputs.title, inputs.Desc, new Date().toLocaleString()],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            // Alert.alert(
            //   'Success',
            //   'You are Added  Successfully notes',
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
          } else alert("Not Save Note");
        },
        (error) => {
          console.log(error);
        }
      );
    });
  };
  //   Create table
  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100), Description VARCHAR(100),Date VARCHAR(100))",
        []
      );
        (error) => {
          console.log(error);
        }
      // txn.executeSql(
      //   "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
      //   [],
      //   (tx, res) => {
      //     console.log("item:", res?.rows?.length);
      //     if (res.rows.length == 0) {
      //       txn.executeSql("DROP TABLE IF EXISTS table_user", []);
      //       txn.executeSql(
      //         "CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100), Description VARCHAR(100),Date VARCHAR(100))",
      //         []
      //       );
      //     }
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );
    });
  }, [isFocused]);

  //    console.log(inputs)
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.title) {
      handleError("Please input title", "title");
      isValid = false;
    }
    if (!inputs.Desc) {
      handleError("Please input Desc", "Desc");
      isValid = false;
    }
    if (isValid) {
      AddNote();
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
      {/* <StatusBar barStyle='dark-content' backgroundColor={COLORS.seconary}/> */}
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Add Note
        </Text>
        {/* <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Login
        </Text> */}
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "title")}
            onFocus={() => handleError(null, "title")}
            iconName="title"
            label="Title"
            placeholder="Enter your title"
            error={errors.title}
          />
          {/* {inputs.email == data.email ? (<Text>hii</Text>):null } */}
          {/* <MaterialIcons name="description" size={24} color="black" /> */}
          <Input
            onChangeText={(text) => handleOnchange(text, "Desc")}
            onFocus={() => handleError(null, "Desc")}
            iconName="description"
            label="Description"
            placeholder="Enter your Desc"
            error={errors.Desc}
            mutline={true}
            // style={{height:100}}
            desc
          />
          <Button title="Save Note" onPress={validate} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditUser;
