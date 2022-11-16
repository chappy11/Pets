export const KEY = {
  ACCOUNT: "Account",
};

export const save = (data) => {
  const payload = JSON.stringify(data);

  localStorage.setItem(KEY.ACCOUNT, payload);
};

export const getItem = async (key) => {
  const data = await localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return null;
};

export const remove = () => {
  localStorage.clear();
};
