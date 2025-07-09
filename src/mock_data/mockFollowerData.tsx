
export interface ClubJoin {
    user_id: string;
    club_id: string;
    joined_at: string;
    status: 'pending' | 'accepted' | 'rejected';
}

export function mockClubJoins(): ClubJoin[] {
  return [
    {
      user_id: '101',
      club_id: '11111111-1111-1111-1111-111111111111',
      joined_at: new Date('2025-07-01T12:00:00Z').toISOString(),
      status: 'pending',
    },
    {
      user_id: '102',
      club_id: '22222222-2222-2222-2222-222222222222',
      joined_at: new Date('2025-06-28T09:45:00Z').toISOString(),
      status: 'accepted',
    },
    {
      user_id: '103',
      club_id: '11111111-1111-1111-1111-111111111111',
      joined_at: new Date('2025-07-03T17:30:00Z').toISOString(),
      status: 'rejected',
    },
  ];
}
