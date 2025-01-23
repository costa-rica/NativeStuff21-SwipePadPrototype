import { StyleSheet, View } from "react-native";
// import ViewTemplate from "../screens_core/components/ViewTemplate";
import { Polygon, Svg, Circle } from "react-native-svg";
import { useState } from "react";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function CircleSwipePad7options(props) {
  //   const circleRadius = 150;
  const innerCircleRadius = props.circleRadius / 2;
  // const outerCircleAdder = 100;
  const outerCircleAdder = props.outerCircleAdder;
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

    // const outerCircleTopBoundary = outerCircleAdder / 2;
    const distance = Math.sqrt(
      Math.pow(x - (props.circleRadius + outerCircleAdder / 2), 2) +
        Math.pow(y - (props.circleRadius + outerCircleAdder / 2), 2)
    );

    // --- Logic for closing modal ---
    if (distance <= innerCircleRadius) {
      console.log("Swipe ended inside the inner circle.");
      props.setActionList([]);
      props.setModalVisible(false);
      return;
    }

    // --- Logic for Color changing ---
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0 && x > y) {
        console.log("swipe right");
        handleSwipeColorChange("right");
      } else {
        console.log("swipe left");
        handleSwipeColorChange("left");
      }
    } else {
      if (translationY > 0) {
        console.log("swipe down");
        handleSwipeColorChange("bottom");
        if (y > props.circleRadius * 2 + outerCircleAdder / 2) {
          handleSwipeColorChange("outerBottom");
        }
      } else {
        console.log("swipe up");
        if (translationX < 0 && x > y) {
          handleSwipeColorChange("topLeft");
        } else if (translationX > 0) {
          handleSwipeColorChange("topRight");
          if (y < outerCircleAdder / 2) {
            handleSwipeColorChange("outerTop");
          }
        }
      }
    }
  });

  // Dynamic Styles
  const styleOuterCircle = {
    width: props.circleRadius * 2 + outerCircleAdder,
    height: props.circleRadius * 2 + outerCircleAdder,
    borderRadius: props.circleRadius + outerCircleAdder / 2,
    backgroundColor: "white",
    overflow: "hidden",
  };
  const styleVwMain = {
    top: outerCircleAdder / 2,
    left: outerCircleAdder / 2,
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
  const styleTopTriangle = {
    position: "absolute",
    top: -(props.circleRadius * (Math.sqrt(2) - 1)) / 2,
    left: props.circleRadius - innerCircleRadius,
    transform: [{ rotate: "-45deg" }],
    backgroundColor: swipeColorDict["topLeft"],
  };
  const styleTopRightTriangle = {
    position: "absolute",
    left: props.circleRadius,
    backgroundColor: swipeColorDict["topRight"],
  };
  const styleRightTriangle = {
    position: "absolute",
    top: props.circleRadius - innerCircleRadius,
    left: props.circleRadius + (props.circleRadius * (Math.sqrt(2) - 1)) / 2, // <--- Key Algo: This places the corner of a rotated in the middle of the parent square.
    backgroundColor: swipeColorDict["right"],
    transform: [{ rotate: "45deg" }],
  };
  const styleBottomTriangle = {
    position: "absolute",
    top: props.circleRadius + (props.circleRadius * (Math.sqrt(2) - 1)) / 2,
    left: props.circleRadius - innerCircleRadius,
    transform: [{ rotate: "-45deg" }],
    backgroundColor: swipeColorDict["bottom"],
  };
  const styleLeftTriangle = {
    position: "absolute",
    top: props.circleRadius - innerCircleRadius,
    // left: props.circleRadius,
    left: -(props.circleRadius * (Math.sqrt(2) - 1)) / 2, // <--- Key Algo: This places the corner of a rotated in the middle of the parent square.
    backgroundColor: swipeColorDict["left"],
    transform: [{ rotate: "45deg" }],
  };

  const styleOuterTopRectangle = {
    position: "absolute",
    top: -(props.circleRadius + outerCircleAdder / 2),
    left: props.circleRadius + outerCircleAdder / 2,
    // top: (props.circleRadius + outerCircleAdder) * (Math.sqrt(2) - 1),
    // left: (props.circleRadius + outerCircleAdder / 2) * (Math.sqrt(2) - 1),
    height: (props.circleRadius + outerCircleAdder / 2) * 2,
    width: (props.circleRadius + outerCircleAdder / 2) * 2,

    // width: 0,
    // height: 0,
    // backgroundColor: "transparent",
    // borderStyle: "solid",
    // borderLeftWidth: props.circleRadius + outerCircleAdder / 4,
    // borderRightWidth: props.circleRadius + outerCircleAdder / 4,
    // borderBottomWidth: (props.circleRadius + outerCircleAdder / 2) * 2,
    // borderLeftColor: "transparent",
    // borderRightColor: "transparent",
    // borderBottomColor: swipeColorDict["outerTop"],

    // transform: [{ rotate: "-120deg" }],
    transform: [{ rotate: "-180deg" }],
    backgroundColor: swipeColorDict["outerTop"],
  };
  const styleRightTriangleHideOuterTopBottom = {
    position: "absolute",
    top: 40,
    left:
      props.circleRadius +
      props.circleRadius * (Math.sqrt(2) - 1) +
      outerCircleAdder -
      40, // <--- Key Algo: T
    backgroundColor: "white",
    transform: [{ rotate: "45deg" }],
  };
  const styleOuterBottomTriangle = {
    position: "absolute",
    top: props.circleRadius + outerCircleAdder / 2 + props.circleRadius / 2,
    left:
      props.circleRadius +
      outerCircleAdder / 2 -
      props.circleRadius -
      innerCircleRadius,
    // top: props.circleRadius + (props.circleRadius * (Math.sqrt(2) - 1)) / 2,
    // left: props.circleRadius - innerCircleRadius,
    transform: [{ rotate: "45deg" }],
    backgroundColor: swipeColorDict["outerBottom"],
    // backgroundColor: "red",
    height: (props.circleRadius + outerCircleAdder / 2) * 2,
    width: (props.circleRadius + outerCircleAdder / 2) * 2,
  };

  return (
    <GestureHandlerRootView style={{ backgroundColor: "transparent" }}>
      {/* <GestureHandlerRootView> */}
      <GestureDetector gesture={gestureSwipeScripting}>
        <View style={styleOuterCircle}>
          <View style={styleOuterBottomTriangle} />
          <View style={styleOuterTopRectangle} />
          <Svg
            height={`${props.circleRadius + outerCircleAdder}`}
            width={`${props.circleRadius + outerCircleAdder}`}
            style={styleRightTriangleHideOuterTopBottom}
          >
            <Polygon
              points={`0,0 0,${props.circleRadius + outerCircleAdder} ${
                props.circleRadius + outerCircleAdder
              },${props.circleRadius + outerCircleAdder}`}
              fill={"white"}
            />
          </Svg>

          <View style={styleVwMain}>
            <Svg
              height={`${props.circleRadius}`}
              width={`${props.circleRadius}`}
              style={styleTopTriangle}
            >
              <Polygon
                points={`0,0 0,${props.circleRadius} ${props.circleRadius},${props.circleRadius}`}
                fill={swipeColorDict["topLeft"]}
              />
            </Svg>

            <Svg
              height={`${props.circleRadius}`}
              width={`${props.circleRadius}`}
              style={styleTopRightTriangle}
            >
              <Polygon
                points={`0,0 0,${props.circleRadius} ${props.circleRadius},${props.circleRadius}`}
                fill={swipeColorDict["topRight"]}
              />
            </Svg>
            <Svg
              height={`${props.circleRadius}`}
              width={`${props.circleRadius}`}
              style={styleRightTriangle}
            >
              <Polygon
                points={`0,0 0,${props.circleRadius} ${props.circleRadius},${props.circleRadius}`}
                fill={swipeColorDict["right"]}
              />
            </Svg>
            <Svg
              height={`${props.circleRadius}`}
              width={`${props.circleRadius}`}
              style={styleBottomTriangle}
            >
              <Polygon
                points={`0,0 0,${props.circleRadius} ${props.circleRadius},${props.circleRadius}`}
                fill={swipeColorDict["bottom"]}
              />
            </Svg>
            <Svg
              height={`${props.circleRadius}`}
              width={`${props.circleRadius}`}
              style={styleLeftTriangle}
            >
              <Polygon
                points={`0,0 0,${props.circleRadius} ${props.circleRadius},${props.circleRadius}`}
                fill={swipeColorDict["left"]}
              />
            </Svg>

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
