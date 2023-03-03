import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  useColorModeValue
} from "@chakra-ui/react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import useTranslation from "next-translate/useTranslation";
import { getText } from "../../services/getApis";

export default function GeradorTextos() {

  const { t } = useTranslation("common");

  const theme = "snow";

  const { quill, quillRef } = useQuill({ theme });

  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState('hidden');

  const [numPalavras, setNumPalavras] = useState();
  const [urlArtigo, setUrlArtigo] = useState('https://webpeak.netlify.app/blogs/6-dicas-para-escrever-conteudo-otimizado-para-seo');
  const [nomeEmpresa, setNomeEmpresa] = useState('Webpeak');
  const [siteEmpresa, setSiteEmpresa] = useState('https://www.webpeak.com.br/');

  // const [text, setText] = useState();

  async function handleSubmit() {

    setIsLoading(true);

    setVisibility('visible');

    getText(numPalavras, urlArtigo, nomeEmpresa, siteEmpresa)
      .then((res) => {
        setIsLoading(false);

        const data = res;

        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          quill.setText(el);
        })

      })
      .catch((err) => {
        setIsLoading(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();
  }

  const fields = [
    {
      isRequired: true,
      id: 'urlArtigo',
      title: t('urlArtigo'),
      value: urlArtigo,
      onChange: (e) => setUrlArtigo(e.target.value)
    },
    {
      isRequired: true,
      id: 'nomeEmpresa',
      title: t('nomeEmpresa'),
      value: nomeEmpresa,
      onChange: (e) => setNomeEmpresa(e.target.value)
    },
    {
      isRequired: true,
      id: 'siteEmpresa',
      title: t('siteEmpresa'),
      value: siteEmpresa,
      onChange: (e) => setSiteEmpresa(e.target.value)
    }
  ]

  return (
    <Flex
      p='10'
      flexDir={'column'}
      gap='4'>
      <FormControl
        isRequired>
        <FormLabel>
          Quantidade de palavras
        </FormLabel>
        <RadioGroup
          colorScheme={'purple'}
          onChange={setNumPalavras}
          defaultValue='500'>
          <Grid
            templateColumns={'repeat(2,1fr)'}>
            <Radio
              value='500'>
              500
            </Radio>
            <Radio
              value='1000'>
              1000
            </Radio>
            <Radio
              value='1500'>
              1500
            </Radio>
            <Radio
              value='2000'>
              2000
            </Radio>
          </Grid>
        </RadioGroup>
      </FormControl>
      {fields.map((item, idx) => (
        <Field
          key={idx}
          isRequired={item.isRequired}
          id={item.id}
          title={item.title}
          value={item.value}
          onChange={item.onChange} />
      ))}
      <Box
        w='full'>
        <Button
          onClick={() => { handleSubmit() }}
          variant="button-orange"
          _hover={{
            bg: "#FFB596",
          }} >
          {t('gerar')}
        </Button>
      </Box>
      
      <Box
        visibility={visibility}>
        {isLoading
          ?
          <CircularProgress
            isIndeterminate />
          :
          <></>
        }
        <Box
        ref={quillRef}
        h={"96"} />
      </Box>
    </Flex>
  )
}

const Field = ({
  isRequired,
  id,
  title,
  value,
  onChange
}) => {

  const bg = useColorModeValue('white', 'gray.900');

  return (
    <FormControl
      isRequired={isRequired}>
      <FormLabel
        htmlFor={id}>
        {title}
      </FormLabel>
      <Input
        borderRadius={'30px'}
        bg={bg}
        id={id}
        value={value || ''}
        onChange={onChange} />
    </FormControl>
  )
}
