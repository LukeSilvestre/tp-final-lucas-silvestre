
export enum Page {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  REGISTRATION = 'registration',
  SECURITY = 'security',
  HISTORY = 'history',
  CALENDAR = 'calendar',
  OWNERS = 'owners'
}

export interface Patient {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  ownerName: string;
  lastVisit: string;
  status: 'active' | 'pending' | 'urgent';
}

export interface Appointment {
  id: string;
  patientName: string;
  ownerName: string;
  time: string;
  type: string;
  veterinarian: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}
