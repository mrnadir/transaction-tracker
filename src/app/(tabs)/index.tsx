import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/icon";
import { HeaderBadge, IconButton } from "@/components/icon-button";
import { PROVIDER_LOGOS } from "@/components/provider-logo";
import { Screen } from "@/components/screen";
import { ScreenHeader } from "@/components/screen-header";
import { SectionTitle } from "@/components/section-title";
import { TransactionRow } from "@/components/transaction-row";
import { Brand, Gradients } from "@/constants/app-theme";
import {
  filterByRange,
  PROVIDER_LABELS,
  summarize,
  todayRange,
  useTransactions,
  type Provider,
} from "@/data/transactions";
import { useAppTheme } from "@/providers/app-theme-provider";
import { formatTaka } from "@/utils/format";

const RECENT_COUNT = 4;

const LOGO_BACKGROUNDS: Record<Provider, string> = {
  bkash: "#FF7EB3",
  nagad: "#FFB15C",
};

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const transactions = useTransactions();
  const today = summarize(filterByRange(transactions, todayRange()));
  const recent = transactions.slice(0, RECENT_COUNT);

  const openTransactions = (provider?: Provider) =>
    router.push({
      pathname: "/transactions",
      params: provider ? { provider } : {},
    });

  return (
    <Screen>
      <ScreenHeader
        title="Home"
        subtitle="Here's your earnings overview"
        leading={<HeaderBadge icon="home" />}
        trailing={
          <IconButton
            icon="bell"
            accessibilityLabel="Notifications"
            showBadge
          />
        }
      />

      <View style={styles.hero}>
        <View style={styles.heroDecoration} pointerEvents="none">
          <Image
            source={require("@/assets/icons/wallet.svg")}
            style={styles.decorationWallet}
            contentFit="contain"
          />
        </View>
        <View style={styles.heroTop}>
          <View style={styles.heroSummary}>
            <View style={styles.heroLabelRow}>
              <View style={styles.heroIcon}>
                <Icon name="wallet" size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.heroLabel}>Today Received</Text>
            </View>
            <Text
              style={styles.heroAmount}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {formatTaka(today.total)}
            </Text>
          </View>
        </View>
        <View style={styles.providerRow}>
          <ProviderTotalCard
            provider="bkash"
            total={today.byProvider.bkash.total}
            onPress={() => openTransactions("bkash")}
          />
          <ProviderTotalCard
            provider="nagad"
            total={today.byProvider.nagad.total}
            onPress={() => openTransactions("nagad")}
          />
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle
          title="Recent transactions"
          action={
            <Pressable
              onPress={() => openTransactions()}
              hitSlop={8}
              accessibilityRole="link"
              style={({ pressed }) => [
                styles.viewAll,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.viewAllText, { color: colors.link }]}>
                View all
              </Text>
              <Icon name="chevronRight" size={14} color={colors.link} />
            </Pressable>
          }
        />
        {recent.length === 0 ? (
          <Text style={[styles.empty, { color: colors.textSecondary }]}>
            Ekhono kono transaction nei.
          </Text>
        ) : (
          recent.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))
        )}
      </View>
    </Screen>
  );
}

type ProviderTotalCardProps = {
  provider: Provider;
  total: number;
  onPress: () => void;
};

function ProviderTotalCard({
  provider,
  total,
  onPress,
}: ProviderTotalCardProps) {
  const isNagad = provider === "nagad";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${PROVIDER_LABELS[provider]} ${formatTaka(total)}`}
      style={({ pressed }) => [
        styles.providerCard,
        isNagad ? styles.nagadCard : styles.bkashCard,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.providerIcon,
          { backgroundColor: LOGO_BACKGROUNDS[provider] },
        ]}
      >
        <Image
          source={PROVIDER_LOGOS[provider]}
          style={styles.providerLogo}
          contentFit="contain"
          tintColor="#FFFFFF"
          accessibilityIgnoresInvertColors
        />
      </View>
      <View style={styles.providerText}>
        <Text style={styles.providerName}>{PROVIDER_LABELS[provider]}</Text>
        <Text
          style={styles.providerAmount}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatTaka(total)}
        </Text>
      </View>
      <Icon name="chevronRight" size={14} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 24,
    padding: 20,
    gap: 14,
    overflow: "hidden",
    backgroundColor: Brand.bkash,
    experimental_backgroundImage: Gradients.hero,
    boxShadow: "0 12px 32px rgba(228, 17, 107, 0.35)",
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  heroSummary: {
    flex: 1,
    gap: 14,
  },
  heroDecoration: {
    position: "absolute",
    top: -70,
    right: -70,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 58,
    paddingRight: 58,
  },
  decorationWallet: {
    width: 60,
    height: 53,
    transform: [{ rotate: "-12deg" }],
  },
  heroLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroLabel: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
    opacity: 0.95,
  },
  heroAmount: {
    color: "#FFFFFF",
    fontSize: 46,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  providerRow: {
    flexDirection: "row",
    gap: 12,
  },
  providerCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  bkashCard: {
    backgroundColor: "rgba(255,255,255,0.14)",
    borderColor: "rgba(255,255,255,0.22)",
  },
  nagadCard: {
    backgroundColor: Brand.nagad,
    experimental_backgroundImage: Gradients.nagadCard,
    borderColor: "rgba(255,255,255,0.25)",
  },
  providerIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  providerLogo: {
    width: 22,
    height: 22,
  },
  providerText: {
    flex: 1,
    gap: 1.5,
  },
  providerName: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "500",
  },
  providerAmount: {
    color: "#FFFFFF",
    fontSize: 19,
    lineHeight: 22,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  section: {
    gap: 12,
  },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  viewAllText: {
    fontSize: 15,
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    paddingVertical: 24,
  },
  pressed: {
    opacity: 0.8,
  },
});
