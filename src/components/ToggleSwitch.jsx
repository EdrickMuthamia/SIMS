import React from 'react';
import { Switch } from 'react-native';

export default function ToggleSwitch({ value, onValueChange }) {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={value ? '#FF3B3B' : '#888'}
    />
  );
}
