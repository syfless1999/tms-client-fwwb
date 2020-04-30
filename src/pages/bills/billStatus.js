export const status2Percent = status => {
  let percent = 0;
  switch (status) {
    case "已提交未初审":
      percent = 33.3;
      break;
    case "已提交初审未通过":
      percent = 33.3;
      break;
    case "已初审未终审":
      percent = 66.7;
      break;
    case "已初审终审未通过":
      percent = 66.7;
      break;
    case "已终审":
      percent = 100;
      break;
    default:
      break;
  }
  return percent;
};


export const status2Color = status => {
  const colorList = ['#7265e6', '#f56a00', '#d42a00'];

  let color="";
  switch (status) {
    case "已提交未初审":
      color = colorList[0];
      break;
    case "已提交初审未通过":
      color = colorList[2];
      break;
    case "已初审未终审":
      color = colorList[0];
      break;
    case "已初审终审未通过":
      color = colorList[2];
      break;
    case "已终审":
      color = colorList[1];
      break;
    default:
      break;
  }
  return color;

}