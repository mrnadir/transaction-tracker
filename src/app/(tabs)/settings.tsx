import * as Device from 'expo-device';
import { router } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Icon, type IconName } from '@/components/icon';
import { IconButton } from '@/components/icon-button';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { Gradients } from '@/constants/app-theme';
import { useAppTheme } from '@/providers/app-theme-provider';

const SERVER_HOST = 'api.example.com';
const DEVICE_NAME =
  Device.modelName ?? (Platform.OS === 'ios' ? 'iPhone' : Platform.OS === 'android' ? 'Android Phone' : 'Web Browser');

function confirmAction(title: string, message: string, confirmLabel: string, onConfirm: () => void) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    { text: confirmLabel, style: 'destructive', onPress: onConfirm },
  ]);
}

export default function SettingsScreen() {
  const { colors, scheme, toggleScheme } = useAppTheme();
  const [paired, setPaired] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const handlePairPress = () => {
    if (!paired) {
      setPaired(true);
      return;
    }
    confirmAction(
      'Unpair device?',
      'Ei device ar server-e transaction pathabe na.',
      'Unpair',
      () => setPaired(false)
    );
  };

  return (
    <Screen>
      <ScreenHeader
        title="Settings"
        subtitle="Manage your account & device"
        leading={
          <IconButton icon="chevronLeft" accessibilityLabel="Back to home" onPress={() => router.navigate('/')} />
        }
        trailing={
          <IconButton
            icon={scheme === 'dark' ? 'sun' : 'moon'}
            accessibilityLabel={scheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onPress={toggleScheme}
          />
        }
      />

      <Card>
        <SettingsRow
          icon="server"
          iconBackground="#3A3468"
          iconColor="#D9D2FF"
          title="Server"
          subtitle={paired ? SERVER_HOST : 'Not configured'}
        />
        <SettingsRow
          icon="phone"
          iconBackground="#1F5FBF"
          iconColor="#FFFFFF"
          title="Device"
          subtitle={DEVICE_NAME}
          divider
        />
        <SettingsRow
          icon="wifi"
          iconBackground="#1E7F4A"
          iconColor="#FFFFFF"
          title="Status"
          divider
          subtitle={
            <View style={styles.statusRow}>
              <View
                style={[styles.statusDot, { backgroundColor: paired ? colors.success : colors.textMuted }]}
              />
              <Text style={[styles.statusText, { color: paired ? colors.success : colors.textMuted }]}>
                {paired ? 'Connected' : 'Disconnected'}
              </Text>
            </View>
          }
        />
        <SettingsRow
          icon="sync"
          iconBackground="#5A2A6E"
          iconColor="#F3D4FF"
          title="Auto sync"
          subtitle="Keep your data up to date"
          divider
          trailing={
            <Switch
              value={autoSync && paired}
              onValueChange={setAutoSync}
              disabled={!paired}
              trackColor={{ false: colors.surfaceRaised, true: '#22C55E' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={colors.surfaceRaised}
            />
          }
        />
      </Card>

      <Pressable
        onPress={handlePairPress}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.pairButton,
          paired ? styles.unpairButton : { backgroundColor: colors.success },
          pressed && styles.pressed,
        ]}>
        <Icon name={paired ? 'unlink' : 'phone'} size={22} color="#FFFFFF" />
        <Text style={styles.pairText}>{paired ? 'Unpair Device' : 'Pair Device'}</Text>
      </Pressable>
    </Screen>
  );
}

type SettingsRowProps = {
  icon: IconName;
  iconBackground: string;
  iconColor: string;
  title: string;
  subtitle: ReactNode;
  trailing?: ReactNode;
  divider?: boolean;
};

function SettingsRow({
  icon,
  iconBackground,
  iconColor,
  title,
  subtitle,
  trailing,
  divider,
}: SettingsRowProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.row,
        divider && { borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
      ]}>
      <View style={[styles.rowIcon, { backgroundColor: iconBackground }]}>
        <Icon name={icon} size={24} color={iconColor} />
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
        {typeof subtitle === 'string' ? (
          <Text style={[styles.rowSubtitle, { color: colors.textSecondary }]} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : (
          subtitle
        )}
      </View>
      {trailing ?? <Icon name="chevronRight" size={16} color={colors.textSecondary} />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  rowIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  rowSubtitle: {
    fontSize: 14,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  pairButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    height: 64,
    borderRadius: 18,
  },
  unpairButton: {
    backgroundColor: '#FF3B4A',
    experimental_backgroundImage: Gradients.danger,
    boxShadow: '0 10px 28px rgba(255, 59, 74, 0.35)',
  },
  pairText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
