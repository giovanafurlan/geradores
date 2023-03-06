import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Container,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import Language from './Language';

const Links = [
    {
        nome: 'Gerador título',
        link: '/geradorTitle'
    },
    {
        nome: 'Gerador anúncio',
        link: '/geradorAds'
    },
    {
        nome: 'Gerador texto',
        link: '/geradorTexto'
    },
    {
        nome: 'Gerador anúncio mídias sociais',
        link: '/geradorSocialMedia'
    },
    {
        nome: 'Gerador anúncio facebook',
        link: '/geradorFacebook'
    }
];

export default function Simple({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box
                bg={useColorModeValue('gray.100', 'gray.900')}
                px={4}>
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen
                            ?
                            <AiOutlineClose />
                            :
                            <GiHamburgerMenu />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen
                            ?
                            onClose
                            :
                            onOpen} />
                    <HStack
                        spacing={8}
                        alignItems={'center'}>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{
                                base: 'none',
                                md: 'flex'
                            }}>
                            {Links.map((link) => (
                                <Link
                                    key={link.link}
                                    px={2}
                                    py={1}
                                    rounded={'md'}
                                    href={link.link}>
                                    {link.nome}
                                </Link>
                            ))}
                        </HStack>
                        <Language />
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box
                        pb={4}
                        display={{
                            md: 'none'
                        }}>
                        <Stack
                            as={'nav'}
                            spacing={4}>
                            {Links.map((link) => (
                                <Link
                                    px={2}
                                    py={1}
                                    rounded={'md'}
                                    href={link.link}>
                                    {link.nome}
                                </Link>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Container
                maxW={'7xl'}
                py='10'>
                {children}
            </Container>
        </>
    );
}