import { StyleSheet } from 'react-native';
import { fonts } from '../constants/theme';

export default StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E6ECF5',
    marginBottom: 12,
  },
  cardUnlocked: {
    borderColor: '#93B4FF',
    borderWidth: 1.5,
    shadowColor: '#2554E8',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconSymbol: {
    fontFamily: fonts.mono,
    fontSize: 13.5,
    fontWeight: '700',
  },
  centerCol: {
    flex: 1,
    marginRight: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  topicTitle: {
    fontFamily: fonts.bold,
    fontSize: 14.5,
    color: '#1F2A44',
  },
  levelPill: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 999,
  },
  levelPillText: {
    fontFamily: fonts.bold,
    fontSize: 10.5,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressTrack: {
    width: 68,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#EDF2F7',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  scoreText: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#64748B',
  },
  statusPillActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8FBF0',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    gap: 5,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  statusActiveText: {
    fontFamily: fonts.bold,
    fontSize: 10.5,
    color: '#15803D',
  },
  statusPillLocked: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    gap: 4,
  },
  statusLockedText: {
    fontFamily: fonts.semibold,
    fontSize: 10.5,
    color: '#94A3B8',
  },
});
