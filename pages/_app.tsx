import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createStandaloneToast } from "@chakra-ui/toast";
import { ChakraProvider } from "@chakra-ui/react";
import TodoProvider from "../src/hooks/UseTodo";

const { ToastContainer, toast } = createStandaloneToast();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <TodoProvider>
        <Component {...pageProps} />
      </TodoProvider>
      <ToastContainer />
    </ChakraProvider>
  );
}
