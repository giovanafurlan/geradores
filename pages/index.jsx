import { useState } from "react";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Flex,
  FormControl,
  Input,
  Select,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { getDescription, getTitle } from "../services/getApis";
import { IoMdCode } from "react-icons/io";
import CopyClipboard from "./components/CopyClipboard";

export default function Home() {

  const [isLoadingT, setIsLoadingT] = useState(false);
  const [isLoadingD, setIsLoadingD] = useState(false);
  const [visibility, setVisibility] = useState('hidden');

  const [keyword, setKeyword] = useState();
  const [type, setType] = useState();
  const [h1, seth1] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const bg = useColorModeValue('white', 'gray.900');

  async function onSubmit() {

    setIsLoadingT(true);
    setIsLoadingD(true);

    setVisibility('visible');

    getTitle(keyword, type)
      .then((res) => {
        // console.log(res);

        setIsLoadingT(false);

        const data = res;

        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          seth1(el);
          setTitle(el);
        })

      })
      .catch((err) => {
        setIsLoadingT(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();

    getDescription(keyword, type)
      .then((res) => {
        // console.log(res);

        setIsLoadingD(false);

        const data = res;

        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          setDescription(el);
        })

      })
      .catch((err) => {
        setIsLoadingD(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();
  }

  function copyHTMLH1() {
    var htmlCode = `<h1>${h1}</h1>`;

    navigator.clipboard.writeText(htmlCode);

    alert(htmlCode);
  }

  function copyHTMLTitle() {
    var htmlCode = `<title>${title}</title>`;

    navigator.clipboard.writeText(htmlCode);

    alert(htmlCode);
  }

  function copyHTMLDescription() {
    var htmlCode = `<meta name="description" content="${description}">`;

    navigator.clipboard.writeText(htmlCode);

    alert(htmlCode);
  }

  return (
    <Flex
      flexDir={"column"}
      gap="6"
      p='10'>
      <FormControl
        className="form">
        <Flex
          gap='4'>
          <Input
            className="palavra-chave"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={'Keyword'}
            borderRadius={"30px"}
            bg={bg} />
          <Select
            id="select-tipo"
            name="tipo"
            onChange={(e) => setType(e.target.value)}
            bg={bg}
            borderRadius={"30px"} >
            <option value="Portal">
              Tipo de conteúdo
            </option>
            <option value="Loja">
              Loja
            </option>
            <option value="Blog">
              Blog
            </option>
            <option value="Institucional">
              Institucional
            </option>
            <option value="Outros">
              Outro
            </option>
          </Select>
          <Button
            onClick={() => { onSubmit() }}
            variant="button-orange"
            _hover={{
              bg: "#FFB596",
            }}
            w='40' >
            Generate
          </Button>
        </Flex>
      </FormControl>
      <Flex
        visibility={visibility}
        className="Fields"
        flexDir={"column"}
        gap="4">
        {isLoadingT
          ?
          <CircularProgress
            isIndeterminate />
          :
          <>
            <Field
              id={"h1-textarea"}
              titulo={'H1'}
              value={h1}
              copyText={h1}
              copyHTML={copyHTMLH1} />
            <Field
              id={"title-textarea"}
              titulo={"Title"}
              value={title}
              copyText={title}
              copyHTML={copyHTMLTitle} />
          </>
        }
        {isLoadingD
          ?
          <CircularProgress
            isIndeterminate />
          :
          <Field
            id={"description-textarea"}
            titulo={"Description"}
            value={description}
            copyText={description}
            copyHTML={copyHTMLDescription} />
        }
      </Flex>
    </Flex>
  )
}

function Field({
  titulo,
  copyText,
  copyHTML,
  id,
  value,
  onChange
}) {

  const border = useColorModeValue("primary", "white");
  const bg = useColorModeValue('white', 'gray.900');

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        align="center">
        <Text>
          {titulo}
        </Text>
        <ButtonGroup spacing="5">
          <CopyClipboard
            pos={'absolute'}
            copyText={copyText} />
          <Button
            onClick={copyHTML}
            variant={"button-outline"}
            borderColor={border}
            color={border}>
            <Flex
              gap="2"
              align={"center"}>
              <IoMdCode />
              HTML
            </Flex>
          </Button>
        </ButtonGroup>
      </Flex>
      <Input
        id={id}
        bg={bg}
        readOnly
        borderRadius={"30px"}
        value={value || ''}
        onChange={onChange} />
    </>
  )
}
