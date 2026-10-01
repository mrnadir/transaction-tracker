import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import type { ColorValue } from 'react-native';

const ICONS = {
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  bell: { ios: 'bell', android: 'notifications', web: 'notifications' },
  wallet: { ios: 'wallet.pass.fill', android: 'account_balance_wallet', web: 'account_balance_wallet' },
  chevronRight: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  chevronLeft: { ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' },
  chevronDown: { ios: 'chevron.down', android: 'keyboard_arrow_down', web: 'keyboard_arrow_down' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  chart: { ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' },
  settings: { ios: 'gearshape.fill', android: 'settings', web: 'settings' },
  calendar: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
  swap: { ios: 'arrow.left.arrow.right', android: 'swap_horiz', web: 'swap_horiz' },
  person: { ios: 'person', android: 'person', web: 'person' },
  server: { ios: 'server.rack', android: 'dns', web: 'dns' },
  phone: { ios: 'iphone', android: 'smartphone', web: 'smartphone' },
  wifi: { ios: 'wifi', android: 'wifi', web: 'wifi' },
  sync: { ios: 'arrow.triangle.2.circlepath', android: 'sync', web: 'sync' },
  unlink: { ios: 'link', android: 'link_off', web: 'link_off' },
  sun: { ios: 'sun.max', android: 'light_mode', web: 'light_mode' },
  moon: { ios: 'moon', android: 'dark_mode', web: 'dark_mode' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  bkash: { ios: 'bird.fill', android: 'flutter_dash', web: 'flutter_dash' },
  nagad: { ios: 'paperplane.fill', android: 'send', web: 'send' },
} as const satisfies Record<string, SymbolViewProps['name']>;

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  size?: number;
  color: ColorValue;
};

export function Icon({ name, size = 22, color }: IconProps) {
  return <SymbolView name={ICONS[name]} size={size} tintColor={color} />;
}
