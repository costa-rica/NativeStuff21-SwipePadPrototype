import { StyleSheet, View } from "react-native";
// import ViewTemplate from "../screens_core/components/ViewTemplate";
import { Polygon, Svg, Circle } from "react-native-svg";
import { useState } from "react";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function CircleSwipePad2options(props) {
  //   const circleRadius = 150;
  const innerCircleRadius = props.circleRadius / 2;
  const outerCircleAdder = 100;
  const [swipeColorDict, setSwipeColorDict] = useState({
    outerTop: "rgba(255,255,0,.4)", //rgb(255,255,0)
    outerBottom: "rgba(186,85,211,.4)", //rgb(186,85,211)
    topLeft: "rgba(255,100,100,1)",
    topRight: "rgba(255,165,0,1)",
    right: "rgba(70,130,180,1)", //rgb(70,130,180)
    bottom: "rgba(30,144,255,1)", //rgb(30,144,255)
    left: "rgba(50,205,50,1)", //rgb(50,205,50)
  });

  const defaultColors = {
    outerTop: "rgba(255,255,0,.4)", //rgb(255,255,0)
    outerBottom: "rgba(186,85,211,.4)", //rgb(186,85,211)
    topLeft: "rgba(255,100,100,1)",
    topRight: "rgba(255,165,0,1)",
    right: "rgba(70,130,180,1)", //rgb(70,130,180)
    bottom: "rgba(30,144,255,1)", //rgb(30,144,255)
    left: "rgba(50,205,50,1)", //rgb(50,205,50)
  };

  // Function to temporarily change color
  const handleSwipeColorChange = (direction) => {
    if (props.actionList?.length > 0) {
      props.setActionList([...props.actionList, direction]);
    } else {
      props.setActionList([direction]);
    }
    if (direction.includes("outer")) {
      setSwipeColorDict((prevState) => ({
        ...prevState,
        [direction]: "white",
      }));
    } else {
      setSwipeColorDict((prevState) => ({
        ...prevState,
        [direction]: "gray",
      }));
    }

    setTimeout(() => {
      setSwipeColorDict((prevState) => ({
        ...prevState,
        [direction]: defaultColors[direction],
      }));
    }, 250);
  };

  const gestureSwipeScripting = Gesture.Pan().onEnd((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;
    console.log("-- new swipe ---");
    console.log(`x:${x}, y:${y}`);

    const distance = Math.sqrt(
      Math.pow(x - props.circleRadius, 2) + Math.pow(y - props.circleRadius, 2)
    );

    // --- Logic for closing modal ---
    if (distance <= innerCircleRadius) {
      console.log("Swipe ended inside the inner circle.");
      //   console.log(`actionsList: ${props.actionList.length}`);
      props.setActionList([]);
      props.setModalVisible(false);
      //   console.log(`actionsList: ${props.actionList.length}`);
      return;
    }

    // --- Logic for Color changing ---
    if (y < props.circleRadius) {
      handleSwipeColorChange("topLeft");
    } else {
      handleSwipeColorChange("bottom");
    }
  });

  // Dynamic Styles
  const styleVwMain = {
    width: props.circleRadius * 2,
    height: props.circleRadius * 2,
    borderRadius: props.circleRadius,
    backgroundColor: "white",
    overflow: "hidden",
  };
  const styleCircleInner = {
    position: "absolute",
    top: props.circleRadius - innerCircleRadius,
    left: props.circleRadius - innerCircleRadius,
    height: 50,
    width: 50,
  };
  const styleTopRectangle = {
    position: "absolute",
    // top: -(props.circleRadius * (Math.sqrt(2) - 1)) / 2,
    // left: props.circleRadius - innerCircleRadius,
    // transform: [{ rotate: "-45deg" }],
    backgroundColor: swipeColorDict["topLeft"],
    height: props.circleRadius,
    width: props.circleRadius * 2,
  };
  const styleBottomRectangle = {
    position: "absolute",
    top: props.circleRadius,
    // left: props.circleRadius - innerCircleRadius,
    // transform: [{ rotate: "-45deg" }],
    backgroundColor: swipeColorDict["bottom"],
    height: props.circleRadius,
    width: props.circleRadius * 2,
  };

  // const styleTopTriangle = {
  //   position: "absolute",
  //   top: -(props.circleRadius * (Math.sqrt(2) - 1)) / 2,
  //   left: props.circleRadius - innerCircleRadius,
  //   transform: [{ rotate: "-45deg" }],
  //   backgroundColor: swipeColorDict["topLeft"],
  // };

  // const styleTopRightTriangle = {
  //   position: "absolute",
  //   left: props.circleRadius,
  //   backgroundColor: swipeColorDict["topRight"],
  // };
  // const styleRightTriangle = {
  //   position: "absolute",
  //   top: props.circleRadius - innerCircleRadius,
  //   // left: props.circleRadius,
  //   left: props.circleRadius + (props.circleRadius * (Math.sqrt(2) - 1)) / 2, // <--- Key Algo: This places the corner of a rotated in the middle of the parent square.
  //   backgroundColor: swipeColorDict["right"],
  //   transform: [{ rotate: "45deg" }],
  // };
  // const styleBottomTriangle = {
  //   position: "absolute",
  //   top: props.circleRadius + (props.circleRadius * (Math.sqrt(2) - 1)) / 2,
  //   left: props.circleRadius - innerCircleRadius,
  //   transform: [{ rotate: "-45deg" }],
  //   backgroundColor: swipeColorDict["bottom"],
  // };
  // const styleLeftTriangle = {
  //   position: "absolute",
  //   top: props.circleRadius - innerCircleRadius,
  //   // left: props.circleRadius,
  //   left: -(props.circleRadius * (Math.sqrt(2) - 1)) / 2, // <--- Key Algo: This places the corner of a rotated in the middle of the parent square.
  //   backgroundColor: swipeColorDict["left"],
  //   transform: [{ rotate: "45deg" }],
  // };
  return (
    <GestureHandlerRootView style={{ backgroundColor: "transparent" }}>
      {/* <GestureHandlerRootView> */}
      <GestureDetector gesture={gestureSwipeScripting}>
        <View style={styleVwMain}>
          <View style={styleTopRectangle} />
          <View style={styleBottomRectangle} />

          <Svg
            height={innerCircleRadius * 2}
            width={innerCircleRadius * 2}
            style={styleCircleInner}
          >
            <Circle
              cx={innerCircleRadius} // Centering horizontally (x coords w/ respect to parent <Svg/>)
              cy={innerCircleRadius} // Centering vertically (y coords w/ respect to parent <Svg/>)
              r={innerCircleRadius}
              stroke="black"
              strokeWidth="1"
              fill="rgba(255,255,255,1)"
              onLayout={(event) => {
                console.log(`circle event (inner):`);
                console.log(event.nativeEvent.layout);
              }}
            />
          </Svg>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestRoot: {
    flex: 1,
    justifyContent: "center",
  },
});
