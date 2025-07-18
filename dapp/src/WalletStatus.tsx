import { useCurrentAccount } from "@mysten/dapp-kit";
import {
  Container,
  Flex,
  Heading,
  Text,
  Separator,
  Card,
} from "@radix-ui/themes";
import { RegisterName } from "./containers/RegisterName";
import { GetAddress } from "./containers/GetAddress";
import { GetName } from "./containers/GetName";

export function WalletStatus() {
  const account = useCurrentAccount();

  return (
    <Container my="4">
      <Heading size="6" mb="4">
        Wallet Status
      </Heading>

      <Card variant="surface" mb="5">
        {account ? (
          <Flex direction="column" gap="2">
            <Text color="green" weight="medium">
              ✅ Wallet connected
            </Text>
            <Text size="2" color="gray">
              Address:
            </Text>
            <Text
              size="2"
              style={{
                wordBreak: "break-all",
                fontFamily: "monospace",
                background: "var(--gray-a2)",
                padding: "0.5rem",
                borderRadius: "6px",
              }}
            >
              {account.address}
            </Text>
          </Flex>
        ) : (
          <Text color="red">⚠️ Wallet not connected</Text>
        )}
      </Card>

      <Separator size="4" my="4" />

      <Flex direction="column" gap="4">
        <RegisterName />
        <GetName />
        <GetAddress />
      </Flex>
    </Container>
  );
}
