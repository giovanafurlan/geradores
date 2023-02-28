import axios from "axios";

const getTitle = async (keyword, type) => {
  return axios
    .get("/api/generateTitle", {
      params: { keyword: keyword, type: type },
    })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      // console.log(e);
      return;
    });
};

const getDescription = async (keyword, type) => {
  return axios
    .get("/api/generateDescription", {
      params: { keyword: keyword, type: type },
    })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      // console.log(e);
      return;
    });
};

export { getTitle, getDescription };
