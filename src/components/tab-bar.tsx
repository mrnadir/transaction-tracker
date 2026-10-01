import type { TabListProps, TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from '@/components/icon';
import { ScreenMaxWidth } from '@/constants/app-theme';
import { useAppTheme } from '@/providers/app-theme-provider';

const TAB_BAR_HEIGHT = 76;
const TAB_BAR_GAP = 12;

/** Bottom padding screens need so content can scroll clear of the floating tab bar. */
export const TAB_BAR_SPACE = TAB_BAR_HEIGHT + TAB_BAR_GAP + 24;

export function TabBar({ style, ...props }: TabListProps) {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={[
        style,
        styles.bar,
        {
          bottom: Math.max(insets.bottom, TAB_BAR_GAP),
          backgroundColor: colors.listItem,
          borderColor: colors.borderStrong,
        },
      ]}
    />
  );
}

type TabButtonProps = TabTriggerSlotProps & { icon: IconName };

export function TabButton({ icon, children, isFocused, ...props }: TabButtonProps) {
  const { colors } = useAppTheme();
  const tint = isFocused ? colors.accent : colors.tabInactive;

  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Icon name={icon} size={26} color={tint} />
      <Text style={[styles.label, { color: tint }, isFocused && styles.labelFocused]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 16,
    right: 16,
    height: TAB_BAR_HEIGHT,
    maxWidth: ScreenMaxWidth - 32,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    borderWidth: 1,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  labelFocused: {
    fontWeight: '700',
  },
});
