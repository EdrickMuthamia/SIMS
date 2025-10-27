import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="items" options={{ headerShown: false }} />
      <Stack.Screen name="item-details" options={{ headerShown: false }} />
    </Stack>
  );
}