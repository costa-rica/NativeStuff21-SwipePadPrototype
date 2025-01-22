import { useState } from "react";
import { View, Modal, Text, StyleSheet, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
// import ViewTemplate from "../screens_core/components/ViewTemplate";
// import CircleSwipePad03 from "./components/CircleSwipePad03";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import CircleSwipePad03 from "./components/CircleSwipePad03";
import CircleSwipePad2options from "./components/CircleSwipePad2options";
import CircleSwipePad7options from "./components/CircleSwipePad7options";

// const modalRadius = 150;
export default function GestureScreen08({ route, navigation }) {
  const { modalRadius, demoOption } = route.params;
  const outerCircleAdder = demoOption == 7 ? 100 : 0;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [actionList, setActionList] = useState([]);
  const [tapDetails, setTapDetails] = useState(null);

  console.log(`in GestureScreen08, modalRadius: ${modalRadius}`);
  console.log(`in GestureScreen08, demoOption: ${demoOption}`);

  const gestureTapBegin = Gesture.Tap().onBegin((event) => {
    console.log(event);
    const timestamp = new Date().toISOString();
    const { x, y, absoluteX, absoluteY } = event;
    setModalPosition({ x: absoluteX, y: absoluteY });
    setModalVisible(true);
    setTapDetails({ timestamp, absoluteX, absoluteY });
  });

  return (
    <ViewTemplate navigation={navigation}>
      <GestureHandlerRootView style={styles.container}>
        {/* <TapGestureHandler onActivated={handleTap}> */}
        <GestureDetector gesture={gestureTapBegin}>
          <View style={styles.tapArea}>
            <View style={styles.vwRegisterTaps}>
              {tapDetails && (
                <View>
                  <Text>Time: {tapDetails.timestamp}</Text>
                  <Text>
                    Coordinates: X:{tapDetails.absoluteX}, Y:
                    {tapDetails.absoluteY}
                  </Text>
                </View>
              )}
              {actionList.length > 0 &&
                actionList.map((elem, index) => {
                  return (
                    <View key={index}>
                      <Text style={styles.txtAction}>Action: {elem}</Text>
                    </View>
                  );
                })}
            </View>
            <Text style={styles.tapText}>Tap anywhere inside this view</Text>
          </View>
        </GestureDetector>
        {/* </TapGestureHandler> */}

        {modalVisible && (
          <Modal
            transparent={true}
            animationType="none"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View
                style={[
                  styles.modalContent,
                  {
                    position: "absolute",
                    left:
                      modalPosition.x - (modalRadius + outerCircleAdder / 2), // Center modal horizontally
                    top: modalPosition.y - (modalRadius + outerCircleAdder / 2), // Center modal vertically
                  },
                ]}
              >
                {/* <CircleSwipePad03
                  circleRadius={modalRadius}
                  setModalVisible={setModalVisible}
                  setActionList={setActionList}
                  actionList={actionList}
                /> */}

                {demoOption == 2 && (
                  <CircleSwipePad2options
                    circleRadius={modalRadius}
                    setModalVisible={setModalVisible}
                    setActionList={setActionList}
                    actionList={actionList}
                  />
                )}
                {demoOption == 5 && (
                  <CircleSwipePad03
                    circleRadius={modalRadius}
                    setModalVisible={setModalVisible}
                    setActionList={setActionList}
                    actionList={actionList}
                  />
                )}
                {demoOption == 7 && (
                  <CircleSwipePad7options
                    circleRadius={modalRadius}
                    setModalVisible={setModalVisible}
                    setActionList={setActionList}
                    actionList={actionList}
                    outerCircleAdder={outerCircleAdder}
                  />
                )}
              </View>
            </View>
          </Modal>
        )}
      </GestureHandlerRootView>
    </ViewTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  tapArea: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  tapText: {
    fontSize: 16,
    color: "#333",
  },
  vwRegisterTaps: {
    position: "absolute",
    top: 0,
    right: 0,
    // width: 100,
    // height: 100,
    // backgroundColor: "tan",
    padding: 3,
    borderRadius: 5,
  },
  // ---- MOdal ---
  modalOverlay: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    alignItems: "center",
    position: "absolute",
    // backgroundColor: "purple",
  },
  txtAction: {
    backgroundColor: "gray",
    alignSelf: "center",
    margin: 1,
  },
});
