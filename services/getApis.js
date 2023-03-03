import axios from "axios";

const getDescriptionsAds = async (company, resume, audience, keywords, avoidKeywords) => {
  return axios
    .get("/api/adsDescriptions", {
      params: { company: company, resume: resume, audience: audience, keywords: keywords, avoidKeywords: avoidKeywords },
    })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};

const getTitlesAds = async (company, resume, audience, keywords, avoidKeywords) => {
  return axios
    .get("/api/adsTitles", {
      params: { company: company, resume: resume, audience: audience, keywords: keywords, avoidKeywords: avoidKeywords },
    })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};

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

const getText= async (numPalavras, urlArtigo, nomeEmpresa, siteEmpresa) => {
  return axios
    .get("/api/generateText", {
      params: { numPalavras: numPalavras, urlArtigo: urlArtigo, nomeEmpresa: nomeEmpresa, siteEmpresa: siteEmpresa },
    })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      // console.log(e);
      return;
    });
};

export { 
  getTitlesAds, 
  getDescriptionsAds, 
  getDescription, 
  getTitle, 
  getText };
