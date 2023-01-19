import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import * as RootNavigation from "./RootNavigation";

import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";

const BottomMenu = () => {
  const state = useSelector((state) => state.addToCart);
  const whishTotal = useSelector((state) => state.addToWhishList);

  const totalCartNumber = () => {
    const CartTotal = state.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    return CartTotal;
  };

  const totalWhishListNumber = () => {
    const WhishTotal = whishTotal.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    return WhishTotal;
  };

  return (
    <View style={styles.bottomMenu}>
      <Text
        style={{
          position: "absolute",
          left: 244,
          bottom: 28,
          width: 17,
          height: 20,
          textAlign: "center",
          color: "pink",
          borderRadius: 50,
        }}
      >
        {totalWhishListNumber() > 0 ? totalWhishListNumber() : ""}
      </Text>
      <Text
        style={{
          position: "absolute",
          left: 102,
          bottom: 26,
          width: 17,
          height: 20,
          textAlign: "center",
          color: "pink",
          borderRadius: 50,
        }}
      >
        {totalCartNumber() > 0 ? totalCartNumber() : ""}
      </Text>
      <TouchableOpacity onPress={() => RootNavigation.navigate("Home")}>
        <Icon name="home" color="orange" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => RootNavigation.navigate("Cart")}>
        <Icon name="shopping-cart" color="#e232fa" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => RootNavigation.navigate("Review")}>
        <Icon name="inbox" color="rgb(250,250,250)" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => RootNavigation.navigate("Whishlist")}>
        <Icon name="heart" color="red" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => RootNavigation.navigate("Payment")}>
        <Icon name="paypal" color="yellow" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomMenu;

const styles = StyleSheet.create({
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    bottom: 20,
  },
});
