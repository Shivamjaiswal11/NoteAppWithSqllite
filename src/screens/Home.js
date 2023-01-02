import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,LogBox
} from "react-native";
import React from "react";
import COLORS from "../../constant/Theme";
import Button from "../../component/Button";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
var db = SQLite.openDatabase("db.db");
import moment from "moment/moment";
import Animated from "react-native-reanimated";
import * as Animatable from 'react-native-animatable';
LogBox.ignoreAllLogs();
const Home = ({ navigation }) => {
 
  // const date= new Date().toLocaleString();
  // console.log(new Date().getDate());
  const isFocused = useIsFocused();
  const [NotesList, setNotesList] = React.useState([]);
  console.log(NotesList);
  React.useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM table_user", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setNotesList(temp);
      });
    });
  };
  const deleteNote = (id) => {
    Alert.alert(
      "Success",
      "Do you want to delete Note ?",
      [
        {
          text: "Ok",
          onPress: () => {
            deleteUser(id);
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  const deleteUser = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM  table_user where user_id=?",
        [id],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            getData();
          } else {
            Alert.alert("Invalid Press");
          }
        }
      );
    });
  };
  return (
    <View style={styles.container}>
      {NotesList.length == 0 ? (
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <Image
            style={{ height: "40%", width: "100%" }}
            source={require("../../assets/notes.gif")}
          />
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>No Notes</Text>
        </View>
      ) : (
        <Animatable.View 
        duration={1000}
        animation="bounceInDown"
        // direction='alternate'
        easing="ease-in-sine"
         iterationCount={1}
        style={styles.container}>
          <FlatList
            data={NotesList}
            // inverted={true}

            // numColumns={2}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={[
                      styles.userItem,
                      {
                        backgroundColor:
                          item.user_id % 2 === 0
                            ? "#C0EB6A"
                            : item.user_id % 3 === 0
                            ? "#FAD06C"
                            : "#FF92A9",
                        // borderColor:item.user_id % 2 === 0
                        // ? "#F00C"
                        // : item.user_id % 3 === 0
                        // ? "#C0EB"
                        // : "#000",
                        // borderWidth:2
                      },
                    ]}
                  >
                    <Text style={[styles.itemText, { fontSize: 25 }]}>
                      {"Title: " + item.title}
                    </Text>
                    <Text style={styles.itemText}>
                      {"Description: " + item.Description}
                    </Text>
                    <Text style={[styles.itemText, { fontSize: 10 }]}>
                      {/* {moment(item.Date).format('DD MMM yy hh:mm A')} */}
                      {moment(item.Date).format("hh:mm A")}{" "}
                      {moment(item.Date).format("DD MMM YY")}
                    </Text>

                    <View style={styles.belowView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("UpdateUser", {
                            data: {
                              title: item.title,
                              Desc: item.Description,
                              id: item.user_id,
                            },
                          });
                        }}
                      >
                        <Feather name="edit" size={24} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          deleteNote(item.user_id);
                        }}
                      >
                        <AntDesign name="delete" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </Animatable.View >
      )}

      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigation.navigate("EditUser");
        }}
      >
        <Feather name="file-plus" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    // alignItems: "center",
  },
  addNewBtn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    // borderWidth:0.2,
    elevation: 5,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
  userItem: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 10,
    elevation: 5,
    margin: 10,

    borderRadius: 10,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  belowView: {
    flexDirection: "row",
    //  width: '50%',
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    // backgroundColor: '#f2f2f2',
    borderRadius: 10,
    // height: 50,
  },
  icons: {
    width: 24,
    height: 24,
  },
});
