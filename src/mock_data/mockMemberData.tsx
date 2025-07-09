export interface Membership {
  id: string; // uuid (or simple string like '301')
  user_id: string; // uuid
  club_id: string; // uuid
  role: string;
  joined_at: string; // ISO timestamp
  is_active: boolean;
  added_by: string; // uuid
}

export function mockMemberships(): Membership[] {
  return [
    {
      id: '301',
      user_id: '101', // Refers to user with id '101'
      club_id: '11111111-1111-1111-1111-111111111111', // Art & Design Club
      role: 'member',
      joined_at: new Date('2025-06-15T10:30:00Z').toISOString(),
      is_active: true,
      added_by: 'admin-001',
    },
    {
      id: '302',
      user_id: '102',
      club_id: '22222222-2222-2222-2222-222222222222', // Tech Society
      role: 'admin',
      joined_at: new Date('2025-05-12T14:00:00Z').toISOString(),
      is_active: true,
      added_by: 'admin-001',
    },
    {
      id: '303',
      user_id: '103',
      club_id: '22222222-2222-2222-2222-222222222222', // Tech Society
      role: 'volunteer',
      joined_at: new Date('2025-07-01T09:00:00Z').toISOString(),
      is_active: false,
      added_by: '302', // added by the admin above
    },
  ];
}
