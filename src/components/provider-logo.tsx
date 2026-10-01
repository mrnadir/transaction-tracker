import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Brand } from '@/constants/app-theme';
import type { Provider } from '@/data/transactions';

export const PROVIDER_LOGOS: Record<Provider, number> = {
  bkash: require('@/assets/bKash.svg'),
  nagad: require('@/assets/nagad.svg'),
};

const NAMES: Record<Provider, string> = {
  bkash: 'bKash',
  nagad: 'Nagad',
};

export function ProviderLogo({ provider }: { provider: Provider }) {
  return (
    <View style={[styles.tile, { backgroundColor: Brand[provider] }]}>
      <Image
        source={PROVIDER_LOGOS[provider]}
        style={styles.logo}
        contentFit="contain"
        tintColor="#FFFFFF"
        accessibilityIgnoresInvertColors
      />
      <Text style={styles.name} numberOfLines={1}>
        {NAMES[provider]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  logo: {
    width: 24,
    height: 24,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
});
