import { SafeAreaView } from "react-native";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Pressable,
  Text,
  Platform,
} from "react-native";
import { useRef, useState } from "react";

export default function ViewTemplate(props) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState("green");

  const handlePressIn = () => {
    setCurrentBackgroundColor("gray"); // Change color on press
    Animated.spring(scaleValue, {
      toValue: 0.7,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setCurrentBackgroundColor("green"); // Revert color when press is released
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();

    props.navigation.goBack();
  };
  const styleView = {
    backgroundColor: currentBackgroundColor,
    padding: 5,
    borderRadius: 35,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  };
  const styleText = {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.container}>
        <View style={styles.containerTop}>
          {!props.noBackButton && (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styleView}
              >
                <Text style={styleText}>Back</Text>
              </Pressable>
            </Animated.View>
          )}
        </View>

        {/* -------- BOTTOM ----- */}
        <View style={styles.containerBottom}>{props.children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  // ----- TOP Container -----
  containerTop: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },

  // ------ Bottom -------
  containerBottom: {
    flex: 1,
  },
});
