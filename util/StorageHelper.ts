import Cookie from "js-cookie";

export const setCookieValue = (
  key: string,
  value: string,
  expires: any = 7
) => {
  Cookie.set(key, value, expires);
};
export const getCookieValue = (key: string) => {
  Cookie.get(key);
};

export const getValueFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value as string);
  } catch (error) {
    return value;
  }
};

export const getValueFromSessionStorage = (key: string) => {
  const value = sessionStorage.getItem(key);
  try {
    return JSON.parse(value as string);
  } catch (error) {
    return value;
  }
};

export const setValueInLocalStorage = (key: string, value: string | object) => {
  localStorage.setItem(
    key,
    typeof value === "object" ? JSON.stringify(value) : value
  );
};

export const setValueInSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(
    key,
    typeof value === "object" ? JSON.stringify(value) : value
  );
};

export const clearValueFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const clearValueFromSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};
