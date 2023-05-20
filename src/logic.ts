export const randomColor = () =>
  ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

const colors = {};

const getRandomColor = (key) => {
  if (!colors[key]) {
    colors[key] = randomColor();
  }
  return colors[key];
};

export const dataFormatter = (response) => {
  console.log(response);

  const keys = response[0];
  const result = [];
  for (let i = 1; i < response.length; i++) {
    const innerArr = response[i];
    const obj = {};
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = innerArr[j];
    }
    result.push(obj);
  }

  const ageCountObj = {};
  const totalCount = result.length;

  result.forEach((item) => {
    const count = ageCountObj[item.age] || 0;
    ageCountObj[item.age] = count + 1;
  });

  Object.keys(ageCountObj).forEach((age) => {
    const count = ageCountObj[age];
    const percent = (count / totalCount) * 100;
    ageCountObj[age] = {
      value: count,
      key: `${age}`,
      label: `${age} (${percent.toFixed(2)}%)`,
      percent: Number(percent.toFixed(2)),
      svg: { fill: getRandomColor(age) },
    };
  });

  return Object.values(ageCountObj);
};
