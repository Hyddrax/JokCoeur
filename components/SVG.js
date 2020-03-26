import React from 'react';
import { HTMLDocument } from 'react-native';
import Svg, { Rect } from 'react-native-svg'

const emotList = [
  ["Colère", "#00F"],
  ["Triste", "#0FF"],
  ["Joie", "#FFF"],
  ["Fatigue", "#F00"],
  ["Ennuye", "#ff0"],
  ["test", "#f0f"],
  ["test2", "#0f0"],
  ["test3", "#8f8"],
]

var generateSVG = (tabs) => {
  var ret = [];

  for (var i = 0; i < tabs.length; i++) {
    var y
    if (i % 2 == 0) {
      y = (100 - tabs[i][0]) * 0.5
    } else {
      y = 100 * 0.5
    }

    let color = emotList.find(element => element[0] == tabs[i][1]);
    if (color == null) {
      color = [["noColor", "#000"]]
    }
    console.log(color[0])
    var tmp = <Rect
      x={(100 / (tabs.length + 2)) * (i + 1) + "%"}
      y={y + "%"}
      width={(100 / (tabs.length + 2)) + "%"}
      height={(tabs[i][0] * 0.5) + "%"}
      fill={color[1]}
      key={(i + 2)}
      onPress={() => {
        let value = color[0];
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
      y="0"
      width="100%"
      height="100%"
      fill="rgb(150,150,150)"
      key={0}
    />
    <Rect
      x="0"
      y="50%"
      width="100%"
      height="1"
      fill="rgb(0,0,0)"
      key={1}
    />
    {generateSVG([[15, "Colère"], [60, "Triste"], [55, "Joie"], [75, "Fatigue"], [30, "Ennuye"], [20, "test"], [85, "test2"], [45, "test3"], [45, "test3"], [45, "test3"], [45, "test3"], [45, "test3"], [45, "test3"]])}
  </Svg>
)

export default SvgComponent