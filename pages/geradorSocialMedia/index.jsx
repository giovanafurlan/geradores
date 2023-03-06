import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { getSocialMedia } from "../../services/getApis";
import CopyClipboard from "../components/CopyClipboard";
import Menu from '../components/Menu';

export default function GeradorSocialMedia() {

  const { t } = useTranslation("common");

  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState('hidden');
  const [display, setDisplay] = useState('none');

  const [topic, setTopic] = useState('American tech multinational business ');

  const [keywords, setKeywords] = useState(['tech']);
  const [id, setId] = useState(1);
  const [name, setName] = useState('');

  const [result, setResult] = useState([]);

  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('primary', 'white');

  const route = useRouter();

  async function onSubmit() {

    const locale = route.locale;

    setIsLoading(true);

    setVisibility('visible');

    getSocialMedia(locale, topic, keywords.toString().toString())
      .then((res) => {
        // console.log(res);

        setIsLoading(false);

        const data = res;

        data.choices.forEach(element => {
          const el = element.text;

          const list = el.split('/');

          setResult(list);

          console.log(result);
        })

      })
      .catch((err) => {
        setIsLoading(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();
  }

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      handleAddClick();
    }
  }

  const handleAddClick = (event) => {
    // event.preventDefault();
    if (name != '') {
      setId(id => id + 1);
      setKeywords(list => [...list, name]);
      setName('');
    }
  }

  const handleClear = () => {
    setId(0);
    setKeywords([]);
  }

  return (
    <Menu>
      <Grid
        templateColumns={{
          lg: 'repeat(3,1fr)',
          sm: 'repeat(1,1fr)'
        }}
        gap='6'>
        <GridItem>
          <form>
            <Flex
              flexDir={'column'}
              gap={'4'}>
              <FormControl
                isRequired>
                <FormLabel
                  htmlFor={id}>
                  {t('topico')}
                </FormLabel>
                <Textarea
                  borderRadius={'30px'}
                  bg={bg}
                  id={id}
                  rows='8'
                  value={topic || ''}
                  onChange={(e) => setTopic(e.target.value)} />
              </FormControl>
              <Flex
                w='full'
                flexDir={'column'}
                gap='4'>
                <Flex
                  align={'center'}
                  gap='2'>
                  <Field
                    title={t('palavraChave')}
                    isRequired={true}
                    value={name}
                    onKeyPress={handleKeypress}
                    onChange={(e) => setName(e.target.value)} />
                  <Button
                    onClick={handleAddClick}
                    variant='button'
                    mt={{
                      '2xl': '8',
                      lg: '12'
                    }}>
                    {t('adicionar')}
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant='button-outline'
                    color={color}
                    borderColor={color}
                    mt={{
                      '2xl': '8',
                      lg: '12'
                    }}>
                    {t('limpar')}
                  </Button>
                </Flex>
                <div>
                  {keywords.map((item) => {
                    const handleRemoveClick = () => {
                      setKeywords(list => list.filter((entry) => entry !== item));
                    };
                    return (
                      <Tag
                        key={item}
                        borderRadius='full'
                        variant='solid'
                        colorScheme='purple'
                        mr='2'
                        mb='2'>
                        <TagLabel>
                          {item}
                        </TagLabel>
                        <TagCloseButton
                          onClick={handleRemoveClick} />
                      </Tag>
                    );
                  })}
                </div>
              </Flex>
              <Button
                value='Generate'
                w='100%'
                mt='4'
                variant='button-orange'
                onClick={() => { onSubmit() }}>
                {t('gerar')}
              </Button>
            </Flex>
          </form>
        </GridItem>
        <GridItem
          colSpan={'2'}
          visibility={visibility}>
          <Flex
            flexDir={'column'}
            bg={bg}
            borderRadius={'30px'}
            p='4'
            gap={'4'}
            alignItems={'initial'}>
            {isLoading
              ?
              <CircularProgress
                isIndeterminate />
              :
              <Flex
                flexDir={'column'}
                gap='4'>
                {result?.map((item) => (
                  <Flex>
                    <Textarea
                      key={item}
                      defaultValue={item} />
                    <CopyClipboard
                      copyText={item} />
                  </Flex>
                ))}
              </Flex>
            }
          </Flex>
        </GridItem>
      </Grid>
    </Menu>
  )
}

const Field = ({
  isRequired,
  id,
  title,
  value,
  onChange,
  handleKeyDown,
  onKeyPress
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
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onKeyPress={onKeyPress} />
    </FormControl>
  )
}