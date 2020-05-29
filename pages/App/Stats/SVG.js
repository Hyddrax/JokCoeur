import React from 'react';
import Svg, { Rect, G } from 'react-native-svg'


// const emotList = [
//   ["Colère", "#00F"],
//   ["Triste", "#0FF"],
//   ["Joie", "#FFF"],
//   ["Fatigue", "#F00"],
//   ["Ennuye", "#ff0"],
//   ["test", "#f0f"],
//   ["test2", "#0f0"],
//   ["test3", "#8f8"],
// ]

var generateSVG = (tabs, emotList) => {

  var ret = [];

  for (var i = 0; i < tabs.length; i++) {
    var y
    if (i % 2 == 0) {
      y = (100 - tabs[i].value) * 0.5
    } else {
      y = 100 * 0.5
    }

    let color = emotList.find(element => element.lib == tabs[i].label);
    if (color == null) {
      color = [["noColor", "#000"]]
    }
    var tmp = <Rect
      x={(100 / (tabs.length + 2)) * (i + 1) + "%"}
      y={y + "%"}
      width={(100 / (tabs.length + 2)) + "%"}
      height={(tabs[i].value * 0.5) + "%"}
      fill={color.color}
      strokeWidth="1"
      stroke="#888"
      key={(i + 2)}
      onPress={() => {
        let value = color.lib;
        alert(value)
      }}
    />


    ret = [...ret, tmp]
  }

  return (ret)

};

const SvgComponent = props => (
  <Svg width="100%" height="100%">
    <Rect
      x="0"
      y="50%"
      width="100%"
      height="1"
      fill="rgb(0,0,0)"
      key={1}
    />
    {generateSVG(props.data, props.emotList)}
  </Svg>
)

export default SvgComponent