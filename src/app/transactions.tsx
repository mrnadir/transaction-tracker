import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '@/components/icon-button';
import { ScreenHeader } from '@/components/screen-header';
import { TransactionRow } from '@/components/transaction-row';
import { ScreenMaxWidth, ScreenPadding } from '@/constants/app-theme';
import {
  isProvider,
  PROVIDER_LABELS,
  PROVIDERS,
  summarize,
  useTransactions,
  type Provider,
} from '@/data/transactions';
import { useAppTheme } from '@/providers/app-theme-provider';
import { formatTaka } from '@/utils/format';

type Filter = Provider | 'all';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  ...PROVIDERS.map((p) => ({ value: p, label: PROVIDER_LABELS[p] })),
];

export default function TransactionsScreen() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ provider?: string }>();
  const [filter, setFilter] = useState<Filter>(isProvider(params.provider) ? params.provider : 'all');

  const transactions = useTransactions();
  const visible = filter === 'all' ? transactions : transactions.filter((t) => t.provider === filter);
  const summary = summarize(visible);

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 },
      ]}
      data={visible}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TransactionRow transaction={item} />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.header}>
          <ScreenHeader
            title="Transactions"
            subtitle={`${summary.count} ta transaction · ${formatTaka(summary.total)}`}
            leading={<IconButton icon="chevronLeft" accessibilityLabel="Back" onPress={goBack} />}
          />
          <View style={styles.filters}>
            {FILTERS.map(({ value, label }) => {
              const active = value === filter;
              return (
                <Pressable
                  key={value}
                  onPress={() => setFilter(value)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  style={({ pressed }) => [
                    styles.chip,
                    {
                      backgroundColor: active ? colors.accent : colors.surface,
                      borderColor: active ? colors.accent : colors.border,
                    },
                    pressed && styles.pressed,
                  ]}>
                  <Text style={[styles.chipText, { color: active ? '#FFFFFF' : colors.textSecondary }]}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      }
      ListEmptyComponent={
        <Text style={[styles.empty, { color: colors.textSecondary }]}>Kono transaction pawa jayni.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: ScreenMaxWidth,
    alignSelf: 'center',
    paddingHorizontal: ScreenPadding,
    gap: 12,
  },
  header: {
    gap: 20,
    marginBottom: 8,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    paddingVertical: 32,
  },
  pressed: {
    opacity: 0.8,
  },
});
