import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      AsyncStorage.getItem("email")
        .then((value) => {
          if (value != null) {
            navigation.replace("Home");
          }
        })
        .catch((e) => {
          console.log("not getting the value...");
        });
    });
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        AsyncStorage.setItem("email", email)
          .then(() => {
            console.log("data saved in local storage...");
          })
          .catch((error) => {
            console.log("not saving...");
          });

        const user = userCredentials.user;
        Alert.alert("Logged In As", user.email);
        navigation.replace("Home");
      })
      .catch((error) =>
        alert("You Have An Invalid Credentials OR An Internet Issue!")
      );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoStyle}
          source={require("../../assets/logo.png")}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter Your Email </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={"abc@gmail.com"}
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your Password </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={"********"}
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      {/* checkbox  */}
      <View style={styles.wrapper}>
        <Checkbox
          value={agree}
          onValueChange={() => setAgree(!agree)}
          color={agree ? "orange" : undefined}
        />
        <Text style={styles.wrapperText}>
          I have read and agreed with the TC
        </Text>
      </View>
      {/* submit button  */}
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor: agree ? "orange" : "grey",
          },
        ]}
        disabled={!agree}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}> Login </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerBtn}
        disabled={!agree}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.buttonText}> Register </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={handleGoogleSignIn}>
        <Text
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: 15,
            paddingLeft: 35,
            textAlign: "center",
            marginTop: 30,
          }}
        >
          SignIn With Google
        </Text>
        <Icon
          style={{ position: "absolute", top: 49, left: 75 }}
          name="google"
          color="white"
        />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingHorizontal: 30,
    backgroundColor: "black",
  },
  logoContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoStyle: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    marginTop: 20,
  },
  labels: {
    fontWeight: "bold",
    // fontSize: 15,
    color: "#fff",
    paddingBottom: 5,
    lineHeight: 25,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 2,
    color: "black",
  },
  multiineStyle: {
    paddingVertical: 4,
  },
  buttonStyle: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  registerBtn: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    marginTop: -20,
  },
  buttonText: {
    color: "#eee",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  wrapperText: {
    marginLeft: 10,
    color: "#fff",
  },
});

export default LoginScreen;
