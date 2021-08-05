import Header from "./components/Header";
import SavedPastes from "./components/SavedPastes";
import UserInput from "./components/UserInput";
import { ChakraProvider } from "@chakra-ui/react";

function App(): JSX.Element {
  return (
    <>
      <Header />
      <UserInput />
      <SavedPastes />
    </>
  );
}

export default App;
