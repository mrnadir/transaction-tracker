import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { useAppTheme } from '@/providers/app-theme-provider';

type Option<T extends string> = { value: T; label: string };

type OptionSheetProps<T extends string> = {
  visible: boolean;
  title: string;
  options: Option<T>[];
  selected: T;
  onSelect: (value: T) => void;
  onClose: () => void;
};

export function OptionSheet<T extends string>({
  visible,
  title,
  options,
  selected,
  onSelect,
  onClose,
}: OptionSheetProps<T>) {
  const { colors } = useAppTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close">
        <Pressable
          style={[styles.sheet, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {options.map((option) => {
            const isSelected = option.value === selected;
            return (
              <Pressable
                key={option.value}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                onPress={() => {
                  onSelect(option.value);
                  onClose();
                }}
                style={({ pressed }) => [
                  styles.option,
                  { backgroundColor: isSelected ? colors.accentSoft : 'transparent' },
                  pressed && styles.pressed,
                ]}>
                <Text
                  style={[styles.optionLabel, { color: isSelected ? colors.accent : colors.text }]}>
                  {option.label}
                </Text>
                {isSelected && (
                  <View>
                    <Icon name="check" size={18} color={colors.accent} />
                  </View>
                )}
              </Pressable>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: 32,
  },
  sheet: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 12,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
});
