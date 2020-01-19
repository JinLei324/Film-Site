export const getTextValue = id => {
  return document.getElementById(id).value;
};
export const innerTextValue = id => {
  return document.getElementById(id).innerText;
};

export const clearInput = id => {
  return (document.getElementById(id).value = "");
};
