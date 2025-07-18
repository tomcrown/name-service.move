import { ConnectButton } from "@mysten/dapp-kit";
import { Container, Flex, Heading, Card } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";

function App() {
  return (
    <>
      <Flex
        position="sticky"
        top="0"
        px="5"
        py="3"
        justify="end"
        align="center"
        style={{
          background: "var(--gray-a2)",
          zIndex: 10,
          borderBottom: "1px solid var(--gray-a3)",
        }}
      >
        <ConnectButton />
      </Flex>

      <Flex justify="center" align="center" mt="8" mb="6">
        <Heading size="9" weight="bold" color="gray">
          Naming Service
        </Heading>
      </Flex>

      <Container size="2" px="4" pb="8">
        <Card
          variant="classic"
          style={{
            background: "var(--gray-a2)",
            padding: "2rem",
            minHeight: 400,
          }}
        >
          <WalletStatus />
        </Card>
      </Container>
    </>
  );
}

export default App;
