import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  LogBox,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
// import { useFonts } from "expo-font";
import AddReview from "./AddReview";
import { Reviews } from "../../firebase";

const ReviewScreen = () => {
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
    const unsub = Reviews.where("year", "==", 2022).onSnapshot(
      (QuerySnapshot) => {
        const reviewsArray = [];
        QuerySnapshot.forEach((reviews) => {
          reviewsArray.push(reviews.data());
        });
        setItems(reviewsArray);
        setReviews(true);
      }
    );
    return () => unsub();
  }, []);

  // let [fontsLoaded] = useFonts({
  //   "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
  //   "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
  // });

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [image, setImage] = useState();

  const [date, setTheDate] = useState("");
  const [month, setTheMonth] = useState("");
  const [year, setTheYear] = useState("");

  const addName = (name) => {
    setName(name);
  };

  const addDescription = (desc) => {
    setDesc(desc);
  };

  const addLogo = (imgLogo) => {
    setImage(imgLogo);
  };

  const setMonth = (themonth) => {
    setTheMonth(themonth);
  };
  const setYear = (theyear) => {
    setTheYear(theyear);
  };
  const setDate = (thedate) => {
    setTheDate(thedate);
  };

  const onCancel = () => {
    setModalVisible(false);
    setName("");
    setDesc("");
    setImage(null);
  };
  const addItems = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.parent}>
      {reviews ? (
        <FlatList
          data={items}
          vertical
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return (
              <View style={styles.parentContainer}>
                <View style={styles.container}>
                  <Image style={styles.image} source={{ uri: item.logo }} />
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    <Text style={styles.date}>{`${item.date + "/"}${
                      item.month + "/"
                    }${item.year}`}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <ActivityIndicator size="large" color="white" style={{ height: 80 }} />
      )}

      <TouchableOpacity>
        <Text style={styles.button} onPress={() => setModalVisible(true)}>
          Mention Review
        </Text>
        <AddReview
          visible={modalVisible}
          addName={addName}
          addDescription={addDescription}
          addLogo={addLogo}
          onCancel={onCancel}
          addItems={addItems}
          setDate={setDate}
          setMonth={setMonth}
          setYear={setYear}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "black",
  },
  parentContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "pink",
  },
  container: {
    width: "70%",
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    marginRight: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    // fontFamily: "Roboto-Black",
    color: "black",
  },
  description: {
    // fontFamily: "Roboto-Medium",
    color: "black",
    width: 170,
  },
  date: {
    color: "black",
  },
  button: {
    backgroundColor: "green",
    textAlign: "center",
    padding: 13,
    color: "white",
  },
});
