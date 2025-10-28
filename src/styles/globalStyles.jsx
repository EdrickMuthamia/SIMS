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
    paddingTop: 50,
    paddingBottom: 60,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
  },
  headerTitle: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  headerIconRight: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },

  menuContainer: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  menuIcon: {
    width: 26,
    height: 26,
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
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 15,
    marginBottom: 60,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  helpText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
});
