import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { useAppTheme } from '@/providers/app-theme-provider';

type SectionTitleProps = {
  icon?: IconName;
  title: string;
  iconColor?: string;
  iconBackground?: string;
  action?: ReactNode;
};

export function SectionTitle({ icon, title, iconColor, iconBackground, action }: SectionTitleProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      {icon && (
        <View style={[styles.iconWrap, { backgroundColor: iconBackground ?? colors.surfaceRaised }]}>
          <Icon name={icon} size={20} color={iconColor ?? colors.textSecondary} />
        </View>
      )}
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
  },
});
