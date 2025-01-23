import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import BtnHomNav from "./components/BtnHomeNav";
import ButtonKv from "./components/ButtonKv";
import CircleSwipePad03 from "../screens/components/CircleSwipePad03";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import { SafeAreaView, StatusBar } from "react-native";
import CircleSwipePad2options from "../screens/components/CircleSwipePad2options";
import CircleSwipePad7options from "../screens/components/CircleSwipePad7options";

export default function Home({ navigation }) {
  const [demoOption, setDemoOption] = useState(2); // 2, 5, 7
  const [modalRadius, setModalRadius] = useState(100);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [actionList, setActionList] = useState([]);

  const handleChoice = (option) => {
    console.log("picked somethinge");
    setDemoOption(option);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.vwTitle}>
          <Text style={styles.txtTitle}>Swipe Pad Demo</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            width: Dimensions.get("window").width * 0.9,
            // backgroundColor: "green",
          }}
        >
          <Text style={{ fontSize: 20 }}> Choose type:</Text>

          <ButtonKv
            colorBackground={"blue"}
            width={50}
            onPress={() => handleChoice(2)}
            selected={demoOption == 2}
          >
            2
          </ButtonKv>
          <ButtonKv
            colorBackground={"blue"}
            width={50}
            onPress={() => handleChoice(5)}
            selected={demoOption == 5}
          >
            5
          </ButtonKv>
          <ButtonKv
            colorBackground={demoOption == 7 ? "red" : "blue"}
            width={50}
            onPress={() => handleChoice(7)}
            selected={demoOption == 7}
          >
            7
          </ButtonKv>
        </View>
        <View style={styles.vwSwipePad}>
          {demoOption == 0 && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text style={{ fontSize: 30 }}>☝️</Text>
              <Text style={{ fontSize: 20 }}>
                Select a type: 2, 5, 0r 7 to show a Swipe Pad
              </Text>
            </View>
          )}
          {demoOption == 2 && (
            <CircleSwipePad2options
              circleRadius={modalRadius}
              setModalVisible={setModalVisible}
              setActionList={setActionList}
              actionList={actionList}
              setDemoOption={setDemoOption}
            />
          )}
          {demoOption == 5 && (
            <CircleSwipePad03
              circleRadius={modalRadius}
              setModalVisible={setModalVisible}
              setActionList={setActionList}
              actionList={actionList}
              setDemoOption={setDemoOption}
            />
          )}
          {demoOption == 7 && (
            <CircleSwipePad7options
              circleRadius={modalRadius}
              setModalVisible={setModalVisible}
              setActionList={setActionList}
              actionList={actionList}
              outerCircleAdder={100}
              setDemoOption={setDemoOption}
            />
          )}
        </View>

        <View style={styles.vwSlider}>
          <Text style={styles.txtLabel}>Adjust Radius: {modalRadius}</Text>
          <Text style={styles.txtLabel}>outerCircle adder: {100}</Text>
          <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={50}
            maximumValue={300}
            step={1}
            value={modalRadius}
            onValueChange={(value) => setModalRadius(value)}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#8E8E93"
            thumbTintColor="#1EB1FC"
          />
        </View>
        <View style={{ padding: 20 }}>
          {demoOption != 0 ? (
            <BtnHomNav
              goTo={"GestureScreen08"}
              title={"Go to Touch Pad Screen ➡️"}
              // description={"use location to display swipe pad"}
              navigation={navigation}
              modalRadius={modalRadius}
              demoOption={demoOption}
            />
          ) : (
            <Text style={{ fontSize: 20 }}>Select a type</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    // justifyContent: "center",
  },
  vwTitle: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  txtTitle: {
    fontSize: 30,
    color: "#fff",
  },
  vwSwipePad: {
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
  },
  vwSlider: {
    marginTop: 50,
    alignItems: "center",
  },
  txtLabel: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 5,
  },
});

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import BtnHomNav from "./components/BtnHomeNav";
// import CircleSwipePad03 from "../screens/components/CircleSwipePad03";
// import { useState } from "react";

// export default function Home({ navigation }) {
//   const [modalRadius, setModalRadius] = useState(150);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
//   const [actionList, setActionList] = useState([]);
//   return (
//     <View style={styles.container}>
//       <View style={styles.vwTitle}>
//         <Text style={styles.txtTitle}>Swipe Pad Demo</Text>
//       </View>

//       <CircleSwipePad03
//         circleRadius={modalRadius}
//         setModalVisible={setModalVisible}
//         setActionList={setActionList}
//         actionList={actionList}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,.2)",
//     alignItems: "center",
//   },
//   vwTitle: {
//     paddingTop: 50,
//     paddingBottom: 100,
//   },
//   txtTitle: { fontSize: 30 },
//   vwButtons: {
//     gap: 5,
//   },
// });
