import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Flex
} from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function GeradorTitle() {

  const router = useRouter();

  return (
    <Container>
      <Flex
        flexDir={'column'}
        gap='4'>
        <Button
          onClick={() => router.push('/geradorTitle')}>
          Gerador Títulos e Descrição
        </Button>
        <Button
          onClick={() => router.push('/geradorAds')}>
          Gerador Anúncios
        </Button>
        <Button
          onClick={() => router.push('/geradorTexto')}>
          Gerador Texto
        </Button>
      </Flex>
    </Container>
  )
}