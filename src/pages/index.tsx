import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Container, Text, Box, Divider, Button, Input, Center, Stack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { randomUUID } from 'crypto'
import axios from 'axios'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [uuids, setUuids] = useState([])
  const [count, setCount] = useState(1)

  return (
    <Container
      minW={"100%"}
      minH={"100vh"}
      p={5}
      mt={"auto"}>
      <Text
        textAlign={"center"}
        fontSize={"4xl"}
        fontWeight={"bold"}
        mt={5}
        fontFamily={"monospace"}>
        UUID Generator
      </Text>
      <Divider mt={3} />
      <Center>
        <Stack mt={5}>
          <Button
            mx={"auto"}
            w={"100%"}
            onClick={async () => {
              const res = await axios.get(`/api/random/uuid?count=${count}`)
              const data = res.data
              const x = uuids
              data["uuids"].forEach((uuid: string) => x.push(uuid as never))
              x.sort((a : any,b : any) => a.time - b.time).reverse()
              setUuids(x.slice(0, 5))
            }}
          >
            Generate
          </Button>
          <Input
            placeholder={"Count"}
            value={count}
            type={"number"}
            min={1}
            onChange={(event) => {
              const value = parseInt(event.target.value)
              if (Number.isNaN(value)) setCount(1)
              else if (value < 1) setCount(1)
              else setCount(value)
            }}
            textAlign={"center"} />
        </Stack>
      </Center>
      <Divider mt={3} />
      <TableContainer maxW={"50%"} mx={"auto"}>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th>UUID</Th>
              <Th>Time to Generate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {uuids.map((uuidData: {
              uuid: string,
              time: number
            }) => {
              return (
                <Tr key={uuidData.uuid}>
                  <Td>{uuidData.uuid}</Td>
                  <Td>{uuidData.time}ms</Td>
                </Tr>
              )
            })}

          </Tbody>
        </Table>
      </TableContainer>

    </Container>
  )
          }
