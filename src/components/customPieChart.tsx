import React from 'react';
import { View } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';

import { Item } from '~/types';

const CustomPieChart: React.FC<{ data: Item[] }> = ({ data }) => {
  let startAngle = -90;

  const total = data.reduce((sum, item) => sum + item.percent, 0);

  const getPathData = (angle: number): string => {
    const radius = 100;
    const centerX = 100;
    const centerY = 100;

    const endAngle = startAngle + angle;

    const x1 = centerX + radius * Math.cos((Math.PI / 180) * startAngle);
    const y1 = centerY + radius * Math.sin((Math.PI / 180) * startAngle);
    const x2 = centerX + radius * Math.cos((Math.PI / 180) * endAngle);
    const y2 = centerY + radius * Math.sin((Math.PI / 180) * endAngle);

    const largeArcFlag = angle <= 180 ? 0 : 1;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="200" height="200">
        <G>
          {data.map((item) => {
            const angle = (360 * item.percent) / total;
            const pathData = getPathData(angle);
            startAngle += angle;
            return (
              <React.Fragment key={item.key}>
                <Path d={pathData} fill={item.svg.fill} />
              </React.Fragment>
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

export default CustomPieChart;
