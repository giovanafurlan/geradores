var axios = require("axios");

export default function handler(req, res) {
  const keyword = req.query.keyword || "";
  if (keyword.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira uma palavra chave válida",
      },
    });
    return;
  }

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
    prompt: `Palavra chave: Chá\nTipo: Loja\nTítulo: Experimente o Chá e Desfrute de Uma Experiência Única!\nPalavra chave: ${keyword}\nTipo: ${type}\nTítulo: `,
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
