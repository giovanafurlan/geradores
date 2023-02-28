import axios from "axios";

const getTitle = async (keywords, type) => {
  return axios
    .get("/api/generateTitle", {
      params: { keywords: keywords, type: type },
    })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      // console.log(e);
      return;
    });
};

const getDescription = async (keywords, type) => {
  return axios
    .get("/api/generateDescription", {
      params: { keywords: keywords, type: type },
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
