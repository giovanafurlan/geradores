var axios = require("axios");

export default function handler(req, res) {
  const locale = req.query.locale;

  const company = req.query.company || "";
  if (company.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira uma empresa válida",
      },
    });
    return;
  }

  const product = req.query.product || "";
  if (product.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira um resumo válido",
      },
    });
    return;
  }

  const tom = req.query.tom || "";
  if (tom.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira um resumo válido",
      },
    });
    return;
  }

  const keywords = req.query.keywords;
  const productDescription = req.query.productDescription;

  var prompt = "";

  if (locale == "en") {
    prompt = `Company name: Saad Moda\nProduct name: Saad Leather Bag\nKeywords: Bag,Accessories\nProduct features: Luxurious,Brand\nSpeaking tone: Neutral\n3 Descriptions for the product (maximum 90 characters each): The Saad Leather Bag is the perfect accessory for those looking for sophistication and elegance./The Saad Moda brand is a reference in luxury bags, and this one is no exception./With the Saad Bag, you take with you the style and quality of a real fashion house.\nCompany name: ${company}\nProduct name: ${product}\nKeywords: ${keywords}}\nProduct features: ${productDescription}\nTom of speech: ${tom}\n3 Descriptions for the product (maximum 90 characters each):`;
  } else if (locale == "es") {
    prompt = `Nombre de la empresa: Saad Moda\nNombre del producto: Saad Leather Bag\nPalabras clave: Bolso,Accesorios\nCaracterísticas del producto: Lujoso, Marca\nTono de conversación: Neutro\n3 Descripciones para el producto (máximo 90 caracteres cada uno): El Saad Leather Bag es el complemento perfecto para quienes buscan sofisticación y elegancia./La marca Saad Moda es un referente en bolsos de lujo, y este no es una excepción./Con el Saad Bag, te llevas el estilo y la calidad de una verdadera casa de moda.\nNombre de la empresa: ${company}\nNombre del producto: ${product}\nPalabras clave: ${keywords}}\nCaracterísticas del producto: ${productDescription}\nTom of speech: ${tom}\n3 Descripciones para el producto (máximo 90 caracteres cada uno):`;
  } else {
    prompt = `Nome da empresa: Saad Moda\nNome do produto: Bolsa de Couro Saad\nPalavras chaves: Bolsa,Acessórios\nCaracteristicas do produto: Luxuoso,Grife\nTom de fala: Neutro\n3 Descrições para o produto (máximo 90 caracteres cada): A Bolsa de Couro Saad é o acessório perfeito para quem busca sofisticação e elegância./A marca Saad Moda é referência em bolsas de luxo, e essa não é exceção./Com a Bolsa Saad, você leva consigo o estilo e a qualidade de uma verdadeira grife de moda.\nNome da empresa: ${company}\nNome do produto: ${product}\nPalavras chaves: ${keywords}}\nCaracteristicas do produto: ${productDescription}\nTom de fala: ${tom}\n3 Descrições para o produto (máximo 90 caracteres cada): `;
  }

  var data = JSON.stringify({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 3000,
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
      console.log(JSON.stringify(response.data));
      console.log(data);
      res.status(200).json(response.data);
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
