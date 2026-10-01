import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TAB_BAR_SPACE } from '@/components/tab-bar';
import { ScreenMaxWidth, ScreenPadding } from '@/constants/app-theme';
import { useAppTheme } from '@/providers/app-theme-provider';

type ScreenProps = {
  children: ReactNode;
  /** Leave room for the floating tab bar. */
  withTabBar?: boolean;
};

export function Screen({ children, withTabBar = true }: ScreenProps) {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + (withTabBar ? TAB_BAR_SPACE : 24),
        },
      ]}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: ScreenMaxWidth,
    alignSelf: 'center',
    paddingHorizontal: ScreenPadding,
    gap: 20,
  },
});
