import Header from "./components/Header";
import SavedPastes from "./components/SavedPastes";
import UserInput from "./components/UserInput";
import { Box, ChakraProvider, Flex, Grid, GridItem } from "@chakra-ui/react";

function App(): JSX.Element {
  return (
    <>
      <ChakraProvider>
        <Header />
        <Grid templateColumns="repeat(10,1fr)" gap={5}>
          <GridItem colSpan={6}>
            <UserInput />
          </GridItem>
          <GridItem colSpan={4}>
            <SavedPastes />
          </GridItem>
        </Grid>
      </ChakraProvider>
    </>
  );
}

export default App;
