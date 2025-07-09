export interface Event {
  id: string;
  club_id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM or "2:00 PM"
  location: string;
  event_type: string;
  banner_url: string;
  is_live: boolean;
  created_by: string;
  created_at: string;
}

export function mockEvents(): Event[] {
  return [
    {
      id: '201',
      club_id: 'C1',
      title: 'Art Jam: Paint & Chill',
      description: 'Join fellow artists for a relaxing art jam session with music and colors.',
      date: '2025-07-10',
      time: '3:00 PM',
      location: 'Art Studio, Building B',
      event_type: 'Workshop',
      banner_url: 'https://example.com/banners/art-jam.jpg',
      is_live: true,
      created_by: '201',
      created_at: new Date().toISOString(),
    },
    {
      id: '202',
      club_id: 'C2',
      title: 'Tech Talk: Future of AI',
      description: 'An interactive session with experts on AI, LLMs, and emerging tech.',
      date: '2025-07-15',
      time: '5:30 PM',
      location: 'Auditorium Hall A',
      event_type: 'Seminar',
      banner_url: 'https://example.com/banners/ai-talk.jpg',
      is_live: false,
      created_by: '202',
      created_at: new Date().toISOString(),
    },
    {
      id: '203',
      club_id: 'C3',
      title: 'Design Sprint Challenge',
      description: 'Compete in teams to solve UX challenges in 2 hours with a fun twist!',
      date: '2025-07-20',
      time: '11:00 AM',
      location: 'Innovation Lab',
      event_type: 'Competition',
      banner_url: 'https://example.com/banners/design-sprint.jpg',
      is_live: true,
      created_by: '203',
      created_at: new Date().toISOString(),
    },

    {
      id: '204',
      club_id: 'C4',
      title: 'Bandish',
      description: 'Bandish is a celebration of creativity, rhythm, and melody. This competition invites artists to compose and perform original pieces that blend tradition with innovation',
      date: '2025-07-20',
      time: '11:00 AM',
      location: 'student activity centre',
      event_type: 'Competition',
      banner_url: 'https://example.com/banners/design-sprint.jpg',
      is_live: true,
      created_by: '204',
      created_at: new Date().toISOString(),
    },

    {
      id: '205',
      club_id: 'C5',
      title: 'Flex & Flow – A Wellness Day',
      description: 'Flex & Flow is a rejuvenating fitness event focused on yoga, stretching, breathing exercises, and mindfulness',
      date: '2025-07-20',
      time: '11:00 AM',
      location: 'football ground',
      event_type: 'Competition',
      banner_url: 'https://example.com/banners/design-sprint.jpg',
      is_live: true,
      created_by: '205',
      created_at: new Date().toISOString(),
    },

    {
      id: '206',
      club_id: 'C6',
      title: 'Chapter & Chill ',
      description: 'this cozy event brings book lovers together for an open book discussion, light-hearted literary games, and warm conversations over coffee or chai',
      date: '2025-07-20',
      time: '11:00 AM',
      location: 'main hall',
      event_type: 'Competition',
      banner_url: 'https://example.com/banners/design-sprint.jpg',
      is_live: true,
      created_by: '206',
      created_at: new Date().toISOString(),
    },
  ];
}
