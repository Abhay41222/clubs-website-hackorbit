interface User {
    id: string; // uuid
    email: string;
    name: string;
    enrollment: string;
    branch: string;
    year: string;
    gender: string;
    role: string[];
    isprofilecomplete: boolean;
    created_at: string;
    updated_at: string;
}

export function mockUserData(): User[] {
    return [
        {
            id: '01',
            email: 'abhay@example.com',
            name: 'Abhay Bhadoriya',
            enrollment: '0901EC231001',
            branch: 'EC',
            year: '3',
            gender: 'Female',
            role: ['student'],
            isprofilecomplete: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: '02',
            email: 'arpit@example.com',
            name: 'Arpit Gupta',
            enrollment: '0901CSE231023',
            branch: 'CSE',
            year: '3',
            gender: 'Male',
            role: ['student'],
            isprofilecomplete: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: '03',
            email: 'kk@example.com',
            name: 'krishna kant',
            enrollment: '0901EE231045',
            branch: 'EE',
            year: '3',
            gender: 'Male',
            role: ['student'],
            isprofilecomplete: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: '04',
            email: 'harsh@example.com',
            name: 'harsh rajpal',
            enrollment: '0901CSD231043',
            branch: 'CSD',
            year: '3',
            gender: 'Male',
            role: ['student'],
            isprofilecomplete: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
    ];
}

interface Credentials {
    email: string;
    password: string;
}

export function mockUser(): Credentials[]{
    return [
        {
            email: 'abhay@example.com', 
            password: 'abhay123',
        },
        {
            email: 'arpit@example.com',
            password: 'arpit123',
        },
        {
            email: 'krishna kant',
            password: 'kk123',
        },
        {
            email: 'harsh@example.com',
            password: 'harsh123',
        }
    ]
}