export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarInitials: string;
  memberSince: string;
  totalAnnualSavings: number;
}

export const mockUser: UserProfile = {
  id: 'user-1',
  firstName: 'Jordan',
  lastName: 'Mitchell',
  email: 'jordan.mitchell@email.com',
  avatarInitials: 'JM',
  memberSince: '2024-08-15',
  totalAnnualSavings: 847,
};
