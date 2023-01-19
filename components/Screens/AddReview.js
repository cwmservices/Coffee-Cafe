import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Reviews } from "../../firebase";

const AddReview = ({
  addItems,
  addName,
  visible,
  addDescription,
  addLogo,
  onCancel,
  setDate,
  setMonth,
  setYear,
}) => {
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState();
  const [desc, setDesc] = useState();

  const date = new Date().getDate().toString();
  const month = new Date().getMonth().toString();
  const year = new Date().getFullYear().toString();

  const onEnter = () => {
    addName(name);
    addDescription(desc);
    addLogo(imageUri);
    setDate(date);
    setMonth(month);
    setYear(year);
    if (!name || !desc || !imageUri) {
      Alert.alert("please Complete Your Review!");
    } else {
      addItems();
      Reviews.add({
        date: Number(date),
        description: desc,
        logo: imageUri,
        month: Number(month),
        name: name,
        year: Number(year),
      });
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={styles.cont}>
        <Text
          style={{
            textAlign: "center",
            paddingTop: 30,
            paddingBottom: 10,
            fontSize: 17,
            opacity: 0.6,
            color: "white",
          }}
        >
          Choose Your Profile Photo...
        </Text>
        <TouchableOpacity>
          <Text
            onPress={openCamera}
            style={{
              // fontFamily: "Roboto-Medium",
              backgroundColor: "orange",
              padding: 10,
              marginBottom: 10,
              textAlign: "center",
              color: "black",
            }}
          >
            Open Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            onPress={openGallery}
            style={{
              // fontFamily: "Roboto-Medium",
              textAlign: "center",
              backgroundColor: "orange",
              padding: 10,
              color: "black",
            }}
          >
            Open Gallery
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 10,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{
                width: 100,
                borderRadius: 50,
                height: 100,
              }}
            />
          )}
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <TextInput
            placeholder="Add Name..."
            style={[
              styles.input,
              {
                marginTop: 10,
                color: "black",
                height: 40,
                borderRadius: 20,
                marginBottom: 10,
                backgroundColor: "white",
              },
            ]}
            onChangeText={(name) => setName(name)}
          />
          <TextInput
            placeholder="Add Description..."
            style={[
              styles.input,
              {
                borderRadius: 20,
                height: 50,
                marginBottom: 10,
                color: "black",
                backgroundColor: "white",
              },
            ]}
            onChangeText={(desc) => setDesc(desc)}
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.box}>
            <Text
              onPress={onCancel}
              style={{
                // fontFamily: "Roboto-Medium",
                backgroundColor: "red",
                color: "white",
                borderRadius: 20,
                padding: 15,
                marginLeft: 6,
              }}
            >
              Cancel
            </Text>
            <Text
              onPress={onEnter}
              style={{
                // fontFamily: "Roboto-Medium",
                backgroundColor: "green",
                color: "white",
                borderRadius: 20,
                padding: 15,
              }}
            >
              Review
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "black",
  },
  input: {
    width: 300,
    padding: 8,
    fontSize: 16,
    textAlign: "center",
  },
  box: {
    flexDirection: "row",
    width: "45%",
    justifyContent: "space-between",
  },
});
