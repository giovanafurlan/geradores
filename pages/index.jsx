import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Flex,
  FormControl,
  Grid,
  GridItem,
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

  const [keywords, setKeyword] = useState(['flor', 'colorido']);
  const [id, setId] = useState(1);
  const [name, setName] = useState('');
  const [type, setType] = useState();
  const [h1, seth1] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('primary', 'white');

  async function onSubmit() {

    setIsLoadingT(true);
    setIsLoadingD(true);

    setVisibility('visible');

    getTitle(keywords.toString(), type)
      .then((res) => {
        setIsLoadingT(false);

        const data = res;

        // console.log(data);

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

    getDescription(keywords.toString(), type)
      .then((res) => {
        setIsLoadingD(false);

        const data = res;

        // console.log(data);

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

  const handleAddClick = (event) => {
    event.preventDefault();
    if (name != '') {
      setId(id => id + 1);
      setKeyword(list => [...list, id + '- ' + name]);
      setName('');
    }
  }

  const handleClear = () => {
    setId(0);
    setKeyword([]);
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
    <Grid
      templateColumns={'repeat(3,1fr)'}
      gap='6'>
      <GridItem>
        <Flex
          flexDir={'column'}
          gap='4'>
          <Text>
            Tipo de Conteúdo
          </Text>
          <Select
            id="select-tipo"
            name="tipo"
            onChange={(e) => setType(e.target.value)}
            bg={bg}
            borderRadius={"30px"} >
            <option value="">
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
          <Text>
            Keywords to Add
          </Text>
          <Flex
            align={'center'}
            gap='2'>
            <Input
              isRequired={true}
              bg={bg}
              value={name}
              borderRadius={"30px"}
              onChange={(e) => setName(e.target.value)} />
            <Button
              onClick={handleAddClick}
              variant='button'>
              Add item
            </Button>
            <Button
              onClick={handleClear}
              variant='button-outline'
              color={color}
              borderColor={color}>
              Clear list
            </Button>
          </Flex>
          <div>
            {keywords.map((item) => {
              const handleRemoveClick = () => {
                setKeyword(list => list.filter((entry) => entry !== item));
              };
              return (
                <Flex
                  key={item}
                  justifyContent={'space-between'}
                  align='center'>
                  <Text
                    fontSize={'lg'}
                    mt='2'>
                    {item}
                  </Text>
                  <Button
                    mt='2'
                    onClick={handleRemoveClick}>
                    x
                  </Button>
                </Flex>
              )
            })}
          </div>

          <Box
            w='full'>
            <Button
              onClick={() => { onSubmit() }}
              float='right'
              variant="button-orange"
              _hover={{
                bg: "#FFB596",
              }}
              w='40' >
              Generate
            </Button>
          </Box>
        </Flex>
      </GridItem>
      <GridItem
        colSpan={'2'}>
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
      </GridItem>
    </Grid>
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
