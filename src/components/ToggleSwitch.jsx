import React from 'react';
import { Switch } from 'react-native';
import colors from '../styles/colors';

export default function ToggleSwitch({ value, onValueChange }) {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={value ? colors.primary : colors.muted}
      trackColor={{ false: colors.surface, true: colors.primary }}
    />
  );
}
