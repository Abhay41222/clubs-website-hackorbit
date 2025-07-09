export interface Club {
  id: string; 
  name: string;
  description: string;
  logo_url: string;
  created_at: string; 
  followers_count: number;
  is_verified: boolean; 
}

export function mockClubs(): Club[] {
  return [
    {
      id: '101',

      name: 'Art & Design Club',
      description: 'A vibrant community for creative expression, design, and collaboration.',
      logo_url: 'https://example.com/logos/art-design.png',
      
      created_at: new Date().toISOString(),
      followers_count: 0,
      is_verified: true,
    },
    { 
      id: '102',
      name: 'Tech Society',
      description: 'Explore emerging technologies, coding sessions, and hackathons.',
      logo_url: 'https://example.com/logos/tech-society.png',
      created_at: new Date().toISOString(),
      followers_count: 0,
      is_verified: true,
    },

    {
      id: '103',
      name: 'music club',
      description: 'A creative hub for music lovers to perform, collaborate, and celebrate the joy of sound. ',
      logo_url: 'https://example.com/logos/music-club.png',
      created_at: new Date().toISOString(),
      followers_count: 0,
      is_verified: true,
    },

    {
      id: '104',
      name: 'querncia',
      description: 'A cozy escape for book lovers to read, reflect, and share stories that inspire.',
      logo_url: 'https://example.com/logos/querncia.png',
      created_at: new Date().toISOString(),
      followers_count: 0,
      is_verified: true,
    },

    {
      id: '105',
      name: 'fitness club',
      description: 'A motivating space for fitness enthusiasts to train, grow stronger, and push their limits together.',
      logo_url: 'https://example.com/logos/fitness-club.png',
      created_at: new Date().toISOString(),
      followers_count: 0,
      is_verified: true,
    },

    {
      id: '106',
      name: 'coding club',
      description: 'A dynamic community for coders to build, learn, and innovate through tech-driven collaboration',
      logo_url: 'https://example.com/logos/coding-club.png',
      created_at: new Date().toISOString(),
      followers_count: 0,
      is_verified: true,
    },


  ];
}
