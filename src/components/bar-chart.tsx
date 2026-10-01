import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Brand, Gradients } from '@/constants/app-theme';
import { useAppTheme } from '@/providers/app-theme-provider';
import { formatCompact } from '@/utils/format';

const PLOT_HEIGHT = 170;
const VALUE_LABEL_SPACE = 22;
const Y_AXIS_WIDTH = 34;
const TICKS = 4;

type BarChartProps = {
  data: { label: string; total: number }[];
};

export function BarChart({ data }: BarChartProps) {
  const { colors } = useAppTheme();
  const max = Math.max(0, ...data.map((d) => d.total));
  const step = Math.max(1000, Math.ceil(max / TICKS / 1000) * 1000);
  const scaleMax = step * TICKS;

  return (
    <View>
      <View style={styles.chartRow}>
        <View style={styles.yAxis}>
          {Array.from({ length: TICKS + 1 }, (_, i) => (
            <Text
              key={i}
              style={[styles.tick, { bottom: (i / TICKS) * PLOT_HEIGHT - 7, color: colors.textSecondary }]}>
              {formatCompact(i * step)}
            </Text>
          ))}
        </View>
        <View style={[styles.plot, { borderColor: colors.border }]}>
          {data.map((d) => (
            <Bar key={d.label} value={d.total} ratio={d.total / scaleMax} labelColor={colors.text} />
          ))}
        </View>
      </View>
      <View style={styles.xAxis}>
        {data.map((d) => (
          <Text key={d.label} style={[styles.xLabel, { color: colors.textSecondary }]}>
            {d.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

function Bar({ value, ratio, labelColor }: { value: number; ratio: number; labelColor: string }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.set(withTiming(ratio, { duration: 600, easing: Easing.out(Easing.cubic) }));
  }, [progress, ratio]);

  const barStyle = useAnimatedStyle(() => ({ height: progress.get() * PLOT_HEIGHT }));

  return (
    <View style={styles.column}>
      {value > 0 && (
        <Text style={[styles.valueLabel, { color: labelColor }]}>{formatCompact(value)}</Text>
      )}
      <Animated.View style={[styles.bar, barStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  chartRow: {
    flexDirection: 'row',
    height: PLOT_HEIGHT + VALUE_LABEL_SPACE,
  },
  yAxis: {
    width: Y_AXIS_WIDTH,
  },
  tick: {
    position: 'absolute',
    left: 0,
    fontSize: 12,
  },
  plot: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 4,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  valueLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  bar: {
    width: '70%',
    maxWidth: 40,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: Brand.bkash,
    experimental_backgroundImage: Gradients.bar,
  },
  xAxis: {
    flexDirection: 'row',
    marginLeft: Y_AXIS_WIDTH + 4,
    marginRight: 4,
    marginTop: 8,
  },
  xLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
  },
});
