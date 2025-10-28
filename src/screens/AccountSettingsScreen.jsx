import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/globalStyles';
import colors from '../styles/colors';

export default function AccountSettingsScreen({ navigation }) {
  const menuItems = [
    { icon: require('../../assets/icons/user.png'), text: 'Edit Profile', screen: 'EditProfile' },
    { icon: require('../../assets/icons/shield.png'), text: 'Security', screen: 'Security' },
    { icon: require('../../assets/icons/bell.png'), text: 'Notifications', screen: 'Notifications' },
    { icon: require('../../assets/icons/lock.png'), text: 'Privacy', screen: 'Privacy' },
    { icon: require('../../assets/icons/info.png'), text: 'Terms & Policies', screen: 'Terms' },
  ];

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.text, fontSize: 18 }}>{'< Back'}</Text>
        </TouchableOpacity>
        <View style={globalStyles.headerContent}>
          <Image source={require('../../assets/icons/logo.png')} style={globalStyles.headerIcon} />
          <Text style={globalStyles.headerTitle}>ACCOUNT & SETTINGS</Text>
          <Image source={require('../../assets/icons/Updates.png')} style={globalStyles.headerIconRight} />
        </View>
      </View>
      <ScrollView contentContainerStyle={globalStyles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={globalStyles.menuItem}
            onPress={() => item.screen && navigation.navigate(item.screen)}
          >
            <Image source={item.icon} style={globalStyles.menuIcon} />
            <Text style={globalStyles.menuText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={globalStyles.helpButton} onPress={() => navigation.navigate('Support')}>
          <Text style={globalStyles.helpText}>Help & Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
