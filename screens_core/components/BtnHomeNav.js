import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function BtnHomeNav(props) {
  return (
    <View style={styles.vwNavGroup}>
      <TouchableOpacity
        style={styles.touchOpNav}
        onPress={() =>
          props.navigation.navigate(props.goTo, {
            modalRadius: props.modalRadius,
            // navigation: props.navigation,
            demoOption: props.demoOption,
          })
        }
      >
        <Text style={styles.txtTouchOpNav}>{props.title}</Text>
      </TouchableOpacity>
      <Text>{props.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  vwNavGroup: {
    borderBottomWidth: 1,
    paddingBottom: 1,
  },
  touchOpNav: {
    backgroundColor: "black",
    padding: 5,
    width: 280,
    borderRadius: 12,
    marginBottom: 1,
  },
  txtTouchOpNav: {
    color: "gray",
    alignSelf: "center",
    fontSize: 20,
  },
});
