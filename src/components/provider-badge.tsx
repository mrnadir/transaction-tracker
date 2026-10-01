import { StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Brand } from '@/constants/app-theme';
import { PROVIDER_LABELS, type Provider } from '@/data/transactions';

export function ProviderBadge({ provider, size = 52 }: { provider: Provider; size?: number }) {
  return (
    <View
      style={[
        styles.badge,
        { width: size, height: size, borderRadius: size * 0.24, backgroundColor: Brand[provider] },
      ]}>
      <Icon name={provider} size={size * 0.38} color="#FFFFFF" />
      <Text style={[styles.label, { fontSize: size * 0.2 }]} numberOfLines={1}>
        {PROVIDER_LABELS[provider]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
