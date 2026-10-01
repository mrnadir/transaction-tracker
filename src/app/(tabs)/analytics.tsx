import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BarChart } from '@/components/bar-chart';
import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { HeaderBadge, IconButton } from '@/components/icon-button';
import { OptionSheet } from '@/components/option-sheet';
import { ProviderBadge } from '@/components/provider-badge';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SectionTitle } from '@/components/section-title';
import { Brand, Gradients } from '@/constants/app-theme';
import {
  dailyTotals,
  filterByRange,
  PROVIDER_LABELS,
  PROVIDERS,
  summarize,
  useTransactions,
  WEEK_LABELS,
  weekRange,
  type Provider,
  type WeekOption,
} from '@/data/transactions';
import { useAppTheme } from '@/providers/app-theme-provider';
import { formatTaka } from '@/utils/format';

const WEEK_OPTIONS = (Object.keys(WEEK_LABELS) as WeekOption[]).map((value) => ({
  value,
  label: WEEK_LABELS[value],
}));

const TOTAL_LABELS: Record<WeekOption, string> = {
  this: 'Ei shoptah received',
  last: 'Gotoshoptah received',
};

export default function AnalyticsScreen() {
  const { colors } = useAppTheme();
  const transactions = useTransactions();
  const [week, setWeek] = useState<WeekOption>('this');
  const [pickerOpen, setPickerOpen] = useState(false);

  const range = weekRange(week);
  const summary = summarize(filterByRange(transactions, range));
  const daily = dailyTotals(transactions, range.start);

  const openTransactions = (provider?: Provider) =>
    router.push({ pathname: '/transactions', params: provider ? { provider } : {} });

  return (
    <Screen>
      <ScreenHeader
        title="Analytics"
        subtitle="Track your performance & earnings"
        leading={<HeaderBadge icon="chart" tint={colors.accent} />}
        trailing={
          <IconButton
            icon="calendar"
            accessibilityLabel="Select week"
            onPress={() => setPickerOpen(true)}
          />
        }
      />

      <View style={styles.statsRow}>
        <Pressable
          onPress={() => openTransactions()}
          accessibilityRole="button"
          style={({ pressed }) => [styles.stat, styles.totalStat, pressed && styles.pressed]}>
          <View style={[styles.statIcon, styles.totalStatIcon]}>
            <Icon name="wallet" size={22} color="#FFFFFF" />
          </View>
          <View style={styles.statText}>
            <Text style={[styles.statLabel, styles.onAccent]} numberOfLines={1}>
              {TOTAL_LABELS[week]}
            </Text>
            <Text style={[styles.statValue, styles.onAccent]} numberOfLines={1} adjustsFontSizeToFit>
              {formatTaka(summary.total)}
            </Text>
          </View>
          <Icon name="chevronRight" size={14} color="#FFFFFF" />
        </Pressable>

        <Pressable
          onPress={() => openTransactions()}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.stat,
            { backgroundColor: colors.surface, borderColor: colors.border },
            pressed && styles.pressed,
          ]}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(167,139,250,0.22)' }]}>
            <Icon name="swap" size={22} color={colors.link} />
          </View>
          <View style={styles.statText}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]} numberOfLines={1}>
              Transaction
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{summary.count}</Text>
          </View>
          <Icon name="chevronRight" size={14} color={colors.textSecondary} />
        </Pressable>
      </View>

      <Card style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View style={[styles.chartIcon, { backgroundColor: colors.surfaceRaised }]}>
            <Icon name="chart" size={18} color={colors.accent} />
          </View>
          <Text style={[styles.chartTitle, { color: colors.text }]} numberOfLines={1}>
            Dainik received (bKash + Nagad)
          </Text>
          <Pressable
            onPress={() => setPickerOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={`Range: ${WEEK_LABELS[week]}`}
            style={({ pressed }) => [
              styles.rangeChip,
              { backgroundColor: colors.surfaceRaised, borderColor: colors.border },
              pressed && styles.pressed,
            ]}>
            <Text style={[styles.rangeText, { color: colors.textSecondary }]}>{WEEK_LABELS[week]}</Text>
            <Icon name="chevronDown" size={12} color={colors.textSecondary} />
          </Pressable>
        </View>
        <BarChart data={daily} />
      </Card>

      <View style={styles.section}>
        <SectionTitle
          icon="person"
          title="Provider onujayi"
          iconColor={colors.accent}
          iconBackground={colors.accentSoft}
        />
        <Card>
          {PROVIDERS.map((provider, index) => {
            const { count } = summary.byProvider[provider];
            const percent = summary.count === 0 ? 0 : Math.round((count / summary.count) * 100);
            return (
              <Pressable
                key={provider}
                onPress={() => openTransactions(provider)}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.providerRow,
                  index > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
                  pressed && styles.pressed,
                ]}>
                <ProviderBadge provider={provider} size={58} />
                <View style={styles.providerText}>
                  <Text style={[styles.providerCount, { color: colors.text }]}>
                    {count} ta transaction
                  </Text>
                  <Text style={[styles.providerName, { color: colors.textSecondary }]}>
                    {PROVIDER_LABELS[provider]}
                  </Text>
                </View>
                <View style={[styles.percentPill, { backgroundColor: `${Brand[provider]}40` }]}>
                  <Text style={[styles.percentText, { color: colors.text }]}>{percent}%</Text>
                </View>
                <Icon name="chevronRight" size={14} color={colors.textSecondary} />
              </Pressable>
            );
          })}
        </Card>
      </View>

      <OptionSheet
        visible={pickerOpen}
        title="Select range"
        options={WEEK_OPTIONS}
        selected={week}
        onSelect={setWeek}
        onClose={() => setPickerOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 96,
  },
  totalStat: {
    flex: 1.15,
    backgroundColor: Brand.bkash,
    experimental_backgroundImage: Gradients.hero,
    borderColor: 'rgba(255,255,255,0.2)',
    boxShadow: '0 10px 24px rgba(228, 17, 107, 0.3)',
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalStatIcon: {
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  statText: {
    flex: 1,
    gap: 4,
  },
  statLabel: {
    fontSize: 13,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  onAccent: {
    color: '#FFFFFF',
  },
  chartCard: {
    padding: 16,
    gap: 18,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  chartIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  rangeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
  },
  rangeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  section: {
    gap: 12,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
  },
  providerText: {
    flex: 1,
    gap: 4,
  },
  providerCount: {
    fontSize: 17,
    fontWeight: '700',
  },
  providerName: {
    fontSize: 14,
  },
  percentPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  percentText: {
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
