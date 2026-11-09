import { StyleSheet } from 'react-native';
import { fonts } from '../constants/theme';

export default StyleSheet.create({
  outerWrapper: {
    backgroundColor: '#FDFCF7',
  },
  tabBarCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#F0F4FA',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    width: 42,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconBoxActive: {
    backgroundColor: '#EDF2FF',
  },
  tabLabel: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#7C8BA1',
  },
  tabLabelActive: {
    fontFamily: fonts.bold,
    color: '#2554E8',
  },
});
