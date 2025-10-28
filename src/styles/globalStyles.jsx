import { StyleSheet } from 'react-native';
import colors from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  headerContainer: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  headerTitle: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  headerIconRight: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },

  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: colors.text,
    marginRight: 15,
  },
  menuText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },

  helpButton: {
    alignSelf: 'center',
    backgroundColor: colors.helpButton,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  helpText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
});
