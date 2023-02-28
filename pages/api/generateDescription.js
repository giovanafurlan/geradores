var axios = require("axios");

export default function handler(req, res) {
  const keywords = req.query.keywords;

  const type = req.query.type || "";
  if (type.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira um tipo válido",
      },
    });
    return;
  }

  var data = JSON.stringify({
    model: "text-davinci-003",
    prompt: `Palavra chave: Chá,Sabor\nTipo: Loja\nDescrição: Venha experimentar o nosso chá e desfrutar de uma experiência única! Oferecemos uma variedade de chás de qualidade, de sabores e aromas únicos. Venha experimentar e descobrir o seu favorito! Aqui na nossa loja você encontrará tudo para desfrutar de uma experiência única com o chá.\nPalavra chave: ${keywords}\nTipo: ${type}\nDescrição: `,
    temperature: 0.5,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  var config = {
    method: "post",
    url: "https://api.openai.com/v1/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.status(200).json(response.data);
      console.log(JSON.stringify(response.data));
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
      if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
          error: {
            message: "An error occurred during your request.",
          },
        });
      }
    });
}
