export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'blue' | 'purple';

export type Theme = 'dark' | 'light';

export type UserRole = 'NORMAL_USER' | 'UNIT_ADMIN' | 'PROCUREMENT_ADMIN' | 'SUPER_ADMIN';

export type LoginFormValues = {
  username: string;
  password: string;
};


export interface MenuItem {
  id: string;
  icon?: any;
  label: string;
  subItems?: MenuItem[]; 
  roleAccess?: UserRole[];
  allowedUsers?: string[]; 
  active?: boolean;
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  unit: string;
  rank?: string;
  designation?: string;
  serviceNumber?: string;
  phone?: string;
  clearanceLevel?: string;
  status: 'Active' | 'Pending';
  serviceYears: number;
  dateOfJoining?: string;
  dateOfSeniority?: string;
  dateOfRetirement?: string; 
}

export interface ModuleConfig {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: any;
  themeColor: string;
  quickActions: {
    label: string;
    icon: any;
    context: { workflow: string; subMenu?: string };
  }[];
  stats: {
    label: string;
    value: string;
    icon: any;
  }[];
}

export interface Approver {
  id: string;
  name: string;
  designation: string;
  unit: string;
  type: 'FIXED' | 'DYNAMIC';
}

export interface RequestItem {
  id: string;
  type: 'Laptop' | 'Dispensation' | 'Policy';
  requester: {
    name: string;
    rank: string;
    unit: string;
    avatar: string;
  };
  title: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  summary: string;
  documentUrl?: string;
  nextApprover?: string;
}

export interface KanbanItem {
  id: string;
  title: string;
  requester: string;
  unit: string;
  date: string;
  timestamp: number;
  type: 'INTERNET' | 'USB' | 'ACCESS';
}

export interface GridItem {
  id: string;
  title: string;
  requester: string;
  rank: string;
  unit: string;
  date: string;
  type: 'INTERNET' | 'USB' | 'ACCESS';
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface QuestionConfig {
  id: string;
  label: string;
  placeholder: string;
}
