import { StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/card";
import { ProviderLogo } from "@/components/provider-logo";
import { TXN_ID_FORMAT, type Transaction } from "@/data/transactions";
import { useAppTheme } from "@/providers/app-theme-provider";
import { formatReceivedAt, formatTaka, maskPhone } from "@/utils/format";

export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const { colors } = useAppTheme();

  return (
    <Card style={[styles.row, { backgroundColor: colors.listItem, borderColor: colors.borderStrong }]}>
      <ProviderLogo provider={transaction.provider} />
      <View style={styles.details}>
        <Text style={[styles.phone, { color: colors.text }]} numberOfLines={1}>
          {maskPhone(transaction.sender)}
        </Text>
        <Text
          style={[styles.meta, { color: colors.textSecondary }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
        >
          {TXN_ID_FORMAT[transaction.provider].label}: {transaction.txnId}
          {" · "}
          {formatReceivedAt(transaction.receivedAt)}
        </Text>
      </View>
      <Text style={[styles.amount, { color: colors.success }]}>
        +{formatTaka(transaction.amount)}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  details: {
    flex: 1,
    gap: 4,
  },
  phone: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  meta: {
    fontSize: 13,
  },
  amount: {
    fontSize: 17,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
});
