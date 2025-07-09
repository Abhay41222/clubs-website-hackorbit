export interface EventParticipation {
  user_id: string;
  event_id: string;
  status: 'interested' | 'going' | 'attended' | 'cancelled'; // optional enum-like safety
  timestamp: string; // ISO format
}


export function mockEventParticipations(): EventParticipation[] {
  return [
    {
      user_id: '101',
      event_id: '201', // Art Jam
      status: 'going',
      timestamp: new Date('2025-07-05T10:00:00Z').toISOString(),
    },
    {
      user_id: '102',
      event_id: '202', // Tech Talk
      status: 'interested',
      timestamp: new Date('2025-07-06T14:30:00Z').toISOString(),
    },
    {
      user_id: '103',
      event_id: '203', // Design Sprint
      status: 'cancelled',
      timestamp: new Date('2025-07-07T16:45:00Z').toISOString(),
    },
    {
      user_id: '101',
      event_id: '203', // Design Sprint
      status: 'attended',
      timestamp: new Date('2025-07-08T11:00:00Z').toISOString(),
    },
  ];
}
