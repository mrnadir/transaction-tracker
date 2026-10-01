import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { useAppTheme } from '@/providers/app-theme-provider';

type IconButtonProps = {
  icon: IconName;
  accessibilityLabel: string;
  onPress?: () => void;
  showBadge?: boolean;
};

export function IconButton({ icon, accessibilityLabel, onPress, showBadge }: IconButtonProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.surfaceRaised, borderColor: colors.border },
        pressed && styles.pressed,
      ]}>
      <Icon name={icon} size={22} color={colors.text} />
      {showBadge && (
        <View
          style={[styles.badge, { backgroundColor: colors.accent, borderColor: colors.surfaceRaised }]}
        />
      )}
    </Pressable>
  );
}

/** Rounded-square, non-interactive icon shown at the start of a screen header. */
export function HeaderBadge({ icon, tint }: { icon: IconName; tint?: string }) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.headerBadge, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }]}>
      <Icon name={icon} size={24} color={tint ?? colors.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  headerBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
