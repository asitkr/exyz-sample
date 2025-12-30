
import {
  Laptop, FileText, Shield, Home, Users, Truck, Building2,
  Anchor, Activity, AlertCircle, Wrench, Mail,
  Award, Clock, Plane, FilePlus, Lock, Key, Wifi, Eye, Search
} from 'lucide-react';
import { UserData, MenuItem, ModuleConfig, Approver, RequestItem, KanbanItem, GridItem, QuestionConfig } from './types';

// --- APP.TSX CONSTANTS ---

export const INITIAL_USERS: UserData[] = [
  {
    id: '1',
    username: 'Adm. J. Doe',
    email: 'j.doe@navy.mil',
    role: 'SUPER_ADMIN',
    unit: 'Pacific Fleet',
    rank: 'Admiral',
    designation: 'Fleet Commander',
    serviceNumber: 'USN-001-ALPHA',
    phone: '312-555-0101',
    clearanceLevel: 'TOP SECRET',
    status: 'Active',
    serviceYears: 25,
    dateOfJoining: '1998-06-15',
    dateOfSeniority: '2020-01-01',
    dateOfRetirement: '2030-06-15'
  },
  {
    id: '2',
    username: 'Lt. T. Paris',
    email: 't.paris@navy.mil',
    role: 'NORMAL_USER',
    unit: 'Voyager Ops',
    rank: 'Lieutenant',
    designation: 'Helmsman',
    serviceNumber: 'USN-042-DELTA',
    phone: '312-555-0102',
    clearanceLevel: 'SECRET',
    status: 'Active',
    serviceYears: 7,
    dateOfJoining: '2016-03-10',
    dateOfSeniority: '2021-05-15',
    dateOfRetirement: '2036-03-10'
  },
  {
    id: '3',
    username: 'Cmdr. Data',
    email: 'data@navy.mil',
    role: 'PROCUREMENT_ADMIN',
    unit: 'Cyber Command',
    rank: 'Commander',
    designation: 'Ops Officer',
    serviceNumber: 'USN-101-ZETA',
    phone: '312-555-0103',
    clearanceLevel: 'TOP SECRET',
    status: 'Active',
    serviceYears: 15,
    dateOfJoining: '2008-09-22',
    dateOfSeniority: '2022-11-01',
    dateOfRetirement: '2038-09-22'
  },
  {
    id: '4',
    username: 'Ens. Crusher',
    email: 'w.crusher@navy.mil',
    role: 'NORMAL_USER',
    unit: 'Medical',
    rank: 'Ensign',
    designation: 'Acting Ensign',
    serviceNumber: 'USN-202-BETA',
    phone: '312-555-0104',
    clearanceLevel: 'CONFIDENTIAL',
    status: 'Pending',
    serviceYears: 1,
    dateOfJoining: '2022-07-01',
    dateOfSeniority: '2022-07-01',
    dateOfRetirement: '2042-07-01'
  },
  {
    id: '5',
    username: 'Capt. Sisko',
    email: 'b.sisko@navy.mil',
    role: 'UNIT_ADMIN',
    unit: 'DS9 Logistics',
    rank: 'Captain',
    designation: 'Station Commander',
    serviceNumber: 'USN-099-GAMMA',
    phone: '312-555-0105',
    clearanceLevel: 'SECRET',
    status: 'Active',
    serviceYears: 12,
    dateOfJoining: '2011-02-14',
    dateOfSeniority: '2019-08-01',
    dateOfRetirement: '2035-02-14'
  },
  {
    id: '6',
    username: 'Lt. Barclay',
    email: 'r.barclay@navy.mil',
    role: 'NORMAL_USER',
    unit: 'Engineering',
    rank: 'Lieutenant',
    designation: 'Systems Analyst',
    serviceNumber: 'USN-088-SIGMA',
    phone: '312-555-0106',
    clearanceLevel: 'SECRET',
    status: 'Active',
    serviceYears: 5,
    dateOfJoining: '2018-11-05',
    dateOfSeniority: '2023-01-15',
    dateOfRetirement: '2038-11-05'
  },
];

export const MENUS_LOGISTICS: MenuItem[] = [
  { id: 'home', icon: Home, label: 'Dashboard', subItems: [], active: true },
  {
    id: 'laptop-request', icon: Laptop, label: 'Equipment', active: true,
    subItems: [
      { id: 'laptop-inbox', label: 'Inbox', active: true },
      { id: 'laptop-my-requests', label: 'My Requests', active: true },
      { id: 'laptop-outbox', label: 'Outbox', active: true }
    ]
  },
  {
    id: 'dispensation', icon: FileText, label: 'Dispensation', active: true,
    subItems: [
      { id: 'dispensation-inbox', label: 'Inbox', active: true },
      { id: 'dispensation-outbox', label: 'Outbox', active: true },
      { id: 'dispensation-my-requests', label: 'My Requests', active: true }
    ]
  },
  {
    id: 'nws-policy', icon: Shield, label: 'NWS Policy', active: true,
    subItems: [
      { id: 'nws-library', label: 'Port Opening Req', active: true },
      { id: 'nws-inbox', label: 'Compliance Log', active: true }
    ]
  },
  {
    id: 'admin-console', icon: Key, label: 'Super Admin', active: true,
    roleAccess: ['SUPER_ADMIN'],
    subItems: [
      { id: 'user-management', label: 'User Roles', active: true },
      { id: 'menu-visibility', label: 'Menu Visibility', active: true }
    ]
  }
];

export const MENUS_PERSONNEL: MenuItem[] = [
  { id: 'home', icon: Home, label: 'HQ Dashboard', subItems: [], active: true },
  {
    id: 'admin-console', icon: Users, label: 'Records', active: true,
    roleAccess: ['SUPER_ADMIN', 'UNIT_ADMIN'],
    subItems: [
      { id: 'personnel-records', label: 'Service Members', active: true },
      { id: 'user-management', label: 'Role Management', active: true },
      { id: 'transfers', label: 'Transfers', active: true }
    ]
  },
  { id: 'evaluations', icon: FileText, label: 'Evaluations', subItems: [], active: true }
];

export const MENUS_FACILITIES: MenuItem[] = [
  { id: 'home', icon: Home, label: 'Status Board', subItems: [], active: true },
  {
    id: 'maintenance', icon: Wrench, label: 'Maintenance', active: true, subItems: [
      { id: 'work-orders', label: 'Work Orders', active: true },
      { id: 'inspections', label: 'Inspections', active: true }
    ]
  },
  { id: 'housing', icon: Building2, label: 'Housing', subItems: [], active: true }
];

export const MENUS_CYBER: MenuItem[] = [
  { id: 'home', icon: Home, label: 'Threat Map', subItems: [], active: true },
  { id: 'incidents', icon: AlertCircle, label: 'Incidents', subItems: [], active: true }
];

export const MENUS_FLEET: MenuItem[] = [
  { id: 'home', icon: Home, label: 'Fleet Ops', subItems: [], active: true },
  { id: 'deployments', icon: Anchor, label: 'Deployments', subItems: [], active: true },
  { id: 'logbook', icon: FileText, label: 'Logbook', subItems: [], active: true }
];

export const MODULE_CONFIGS: ModuleConfig[] = [
  {
    id: 'logistics',
    category: 'Administration',
    title: 'eAnumodan',
    description: 'Procurement, digital laptop issuance, and NWS Policy authorization.',
    icon: Laptop,
    themeColor: 'blue',
    quickActions: [
      { label: 'Request Asset', icon: Laptop, context: { workflow: 'laptop-request', subMenu: 'laptop-new-request' } },
      { label: 'Network Waiver', icon: Wifi, context: { workflow: 'dispensation', subMenu: 'dispensation-my-requests' } },
      { label: 'Port Opening', icon: Shield, context: { workflow: 'nws-policy', subMenu: 'nws-library' } }
    ],
    stats: []
  },
  {
    id: 'personnel',
    category: 'Administration',
    title: 'eSamman',
    description: 'Awards, recognition, and service record management.',
    icon: Award,
    themeColor: 'emerald',
    quickActions: [
      { label: 'My Records', icon: FileText, context: { workflow: 'admin-console', subMenu: 'personnel-records' } },
      { label: 'Team Roster', icon: Users, context: { workflow: 'admin-console', subMenu: 'user-management' } }
    ],
    stats: [
      { label: 'Active Personnel', value: '14,203', icon: Users },
      { label: 'Transfers Pending', value: '45', icon: Truck },
      { label: 'Promotions Due', value: '12', icon: Award },
      { label: 'On Leave', value: '830', icon: Clock }
    ]
  },
  {
    id: 'facilities',
    category: 'Operations',
    title: 'NIC Mail',
    description: 'Secure internal communication services and housing.',
    icon: Mail,
    themeColor: 'amber',
    quickActions: [
      { label: 'New Ticket', icon: FilePlus, context: { workflow: 'maintenance', subMenu: 'work-orders' } },
      { label: 'Housing', icon: Home, context: { workflow: 'housing', subMenu: '' } }
    ],
    stats: [
      { label: 'Open Tickets', value: '24', icon: FilePlus },
      { label: 'Maintenance Ops', value: '3', icon: Wrench },
      { label: 'Occupancy Rate', value: '94%', icon: Building2 },
      { label: 'Inspections', value: '7', icon: Search }
    ]
  },
  {
    id: 'cyber',
    category: 'Intelligence',
    title: 'eVigam',
    description: 'Retirement processing and cyber incident reporting.',
    icon: Shield,
    themeColor: 'purple',
    quickActions: [
      { label: 'Report Incident', icon: AlertCircle, context: { workflow: 'incidents', subMenu: '' } },
      { label: 'Audit Log', icon: Lock, context: { workflow: 'home', subMenu: '' } }
    ],
    stats: [
      { label: 'Threat Level', value: 'Low', icon: Shield },
      { label: 'Active Incidents', value: '0', icon: AlertCircle },
      { label: 'Network Load', value: '45%', icon: Activity },
      { label: 'Watch List', value: '12', icon: Eye }
    ]
  },
  {
    id: 'fleet',
    category: 'Operations',
    title: 'FVSCS',
    description: 'Foreign Visitor Screening & Control System.',
    icon: Plane,
    themeColor: 'cyan',
    quickActions: [
      { label: 'Visitor Log', icon: FileText, context: { workflow: 'logbook', subMenu: '' } },
      { label: 'Deployments', icon: Anchor, context: { workflow: 'deployments', subMenu: '' } }
    ],
    stats: [
      { label: 'Active Ships', value: '8', icon: Anchor },
      { label: 'Aircraft', value: '42', icon: Plane },
      { label: 'Missions', value: '15', icon: Activity },
      { label: 'Personnel', value: '2,400', icon: Users }
    ]
  }
];

// --- INBOX CONSTANTS ---

export const INITIAL_MOCK_REQUESTS: RequestItem[] = [
  {
    id: 'REQ-1044',
    type: 'Laptop',
    requester: { name: 'Lt. Cmdr. Data', rank: 'Lieutenant Commander', unit: 'Cyber Command', avatar: 'D' },
    title: 'High-Performance Workstation Request',
    submittedDate: '2023-10-24T10:30:00',
    status: 'Pending',
    summary: 'Requesting issuance of MacBook Pro 16" for DevOps simulations and container orchestration tasks.',
    documentUrl: 'https://pdfobject.com/pdf/sample.pdf',
    nextApprover: 'Capt. Picard'
  },
  {
    id: 'REQ-1045',
    type: 'Dispensation',
    requester: { name: 'Ens. W. Crusher', rank: 'Ensign', unit: 'Medical Ops', avatar: 'W' },
    title: 'Remote Access VPN Waiver',
    submittedDate: '2023-10-25T09:15:00',
    status: 'Pending',
    summary: 'Requesting temporary waiver for VPN usage on non-standard device due to field deployment requirements in Sector 7.',
    documentUrl: 'https://pdfobject.com/pdf/sample.pdf',
    nextApprover: 'Lt. Cmdr. Tuvok'
  },
  {
    id: 'REQ-1042',
    type: 'Policy',
    requester: { name: 'Capt. Picard', rank: 'Captain', unit: 'Bridge Command', avatar: 'P' },
    title: 'Policy Review: NWS-882',
    submittedDate: '2023-10-23T14:00:00',
    status: 'Pending',
    summary: 'Annual review of Nuclear Weapons Safety policy. Acknowledgment required by all command staff before 30 OCT.',
    documentUrl: 'https://pdfobject.com/pdf/sample.pdf',
    nextApprover: 'Adm. Janeway'
  },
  {
    id: 'REQ-1039',
    type: 'Laptop',
    requester: { name: 'Lt. Barclay', rank: 'Lieutenant', unit: 'Engineering', avatar: 'R' },
    title: 'Standard Terminal Replacement',
    submittedDate: '2023-10-20T11:45:00',
    status: 'Approved',
    summary: 'Replacement of damaged terminal. Screen flicker issue reported.',
    documentUrl: 'https://pdfobject.com/pdf/sample.pdf'
  },
  {
    id: 'REQ-1030',
    type: 'Dispensation',
    requester: { name: 'Cmdr. Riker', rank: 'Commander', unit: 'Bridge Command', avatar: 'R' },
    title: 'Emergency Comms Access',
    submittedDate: '2023-10-18T08:00:00',
    status: 'Rejected',
    summary: 'Request denied due to insufficient security clearance for the requested band.',
    documentUrl: 'https://pdfobject.com/pdf/sample.pdf'
  }
];

// --- ROUTE MODAL CONSTANTS ---

export const FIXED_APPROVERS: Approver[] = [
  { id: 'sys-1', name: 'Lt. Cmdr. Tuvok', designation: 'Security Chief', unit: 'Security Ops', type: 'FIXED' },
  { id: 'sys-2', name: 'Lt. Torres', designation: 'Logistics Officer', unit: 'Engineering', type: 'FIXED' }
];

export const ROLES_OPTIONS = ['Head of Department', 'Commanding Officer', 'Division Officer', 'Executive Officer'];
export const UNITS_OPTIONS = ['Cyber Command', 'Medical Ops', 'Bridge Command', 'Engineering', 'Fleet Support'];
export const AUTHORITIES_OPTIONS = ['Capt. Janeway', 'Cmdr. Chakotay', 'Adm. Paris', 'Capt. Sisko', 'Lt. Cmdr. Data'];

// --- LAPTOP REQUEST CONSTANTS ---

export const LAPTOP_CONDITIONS = [
  "I understand that the laptop is government property and must be used for official business only.",
  "I agree to adhere to all cybersecurity policies and will not install unauthorized software.",
  "I will report any loss, theft, or damage immediately to the IT Security Office.",
  "I acknowledge that all activity on this device is subject to monitoring."
];

// --- DISPENSATION REQUEST CONSTANTS ---

export const INTERNET_QUESTIONS: QuestionConfig[] = [
  { id: 'iq1', label: 'Connectivity Mode', placeholder: 'e.g. Broadband, Leased Line, 4G Dongle' },
  { id: 'iq2', label: 'Static IP Required', placeholder: 'Yes / No' },
  { id: 'iq3', label: 'MAC Binding Status', placeholder: 'e.g. Bound, Pending, Not Applicable' },
  { id: 'iq4', label: 'OS Hardening Applied', placeholder: 'Yes / No' },
  { id: 'iq5', label: 'Antivirus Definition', placeholder: 'e.g. Server Update, Standalone' },
  { id: 'iq6', label: 'USB Port Policy', placeholder: 'e.g. Blocked, Read-Only, Open' },
  { id: 'iq7', label: 'Official Email Only', placeholder: 'Yes / No' },
  { id: 'iq8', label: 'Isolated Network Segment', placeholder: 'Yes / No' },
  { id: 'iq9', label: 'Browser Restrictions', placeholder: 'List restrictions or N/A' },
  { id: 'iq10', label: 'Admin Rights Required', placeholder: 'Yes / No (Justify if Yes)' }
];

export const NON_INTERNET_QUESTIONS: QuestionConfig[] = [
  { id: 'nq1', label: 'Data Classification', placeholder: 'e.g. Restricted, Confidential, Secret' },
  { id: 'nq2', label: 'Physical Security', placeholder: 'e.g. Access Control, Safe, Open Office' },
  { id: 'nq3', label: 'BIOS Password Set', placeholder: 'Yes / No' },
  { id: 'nq4', label: 'External Ports Sealed', placeholder: 'Yes / No' },
  { id: 'nq5', label: 'Dedicated Power Supply', placeholder: 'Yes / No' },
  { id: 'nq6', label: 'Peripherals Connected', placeholder: 'e.g. Printer, Scanner, None' },
  { id: 'nq7', label: 'Data Transfer Method', placeholder: 'e.g. One-way Import, Prohibited' },
  { id: 'nq8', label: 'Audit Logs Enabled', placeholder: 'Yes / No' },
  { id: 'nq9', label: 'Auth Method', placeholder: 'e.g. Password, Smart Card, Bio' },
  { id: 'nq10', label: 'Hardware Lock Present', placeholder: 'Yes / No' }
];

// --- DISPENSATION BOARD (KANBAN) ---

export const MOCK_KANBAN_DATA: KanbanItem[] = [
  { id: 'DSP-9921', title: 'Internet Access for Research', requester: 'Lt. Paris', unit: 'Voyager Ops', date: '2h ago', timestamp: Date.now() - 2 * 60 * 60 * 1000, type: 'INTERNET' },
  { id: 'DSP-9924', title: 'Temp USB Authorization', requester: 'Ens. Kim', unit: 'Ops', date: '4h ago', timestamp: Date.now() - 4 * 60 * 60 * 1000, type: 'USB' },
  { id: 'DSP-9929', title: 'Lab 4 Access Waiver', requester: 'Dr. Zimmerman', unit: 'Holography', date: '5h ago', timestamp: Date.now() - 5 * 60 * 60 * 1000, type: 'ACCESS' },
  { id: 'DSP-9918', title: 'VPN Exception Request', requester: 'Cmdr. Chakotay', unit: 'Command', date: '1d ago', timestamp: Date.now() - 25 * 60 * 60 * 1000, type: 'INTERNET' },
  { id: 'DSP-9899', title: 'Holo-Emitter Config', requester: 'Lt. Barclay', unit: 'Engineering', date: '1d ago', timestamp: Date.now() - 28 * 60 * 60 * 1000, type: 'ACCESS' },
  { id: 'DSP-9755', title: 'Unrestricted WiFi', requester: 'Neelix', unit: 'Mess Hall', date: '3d ago', timestamp: Date.now() - 72 * 60 * 60 * 1000, type: 'INTERNET' },
  { id: 'DSP-9721', title: 'External Comms Array', requester: 'Seven of Nine', unit: 'Astrometrics', date: '4d ago', timestamp: Date.now() - 96 * 60 * 60 * 1000, type: 'ACCESS' },
];

// --- DISPENSATION GRID ---

export const MOCK_GRID_DATA: GridItem[] = [
  { id: 'DSP-9921', title: 'Internet Access for Research', requester: 'Lt. Paris', rank: 'Lieutenant', unit: 'Voyager Ops', date: '2h ago', type: 'INTERNET', status: 'Pending' },
  { id: 'DSP-9924', title: 'Temp USB Authorization', requester: 'Ens. Kim', rank: 'Ensign', unit: 'Ops', date: '4h ago', type: 'USB', status: 'Approved' },
  { id: 'DSP-9929', title: 'Lab 4 Access Waiver', requester: 'Dr. Zimmerman', rank: 'Civilian', unit: 'Holography', date: '5h ago', type: 'ACCESS', status: 'Pending' },
  { id: 'DSP-9918', title: 'VPN Exception Request', requester: 'Cmdr. Chakotay', rank: 'Commander', unit: 'Command', date: '1d ago', type: 'INTERNET', status: 'Rejected' },
  { id: 'DSP-9899', title: 'Holo-Emitter Config', requester: 'Lt. Barclay', rank: 'Lieutenant', unit: 'Engineering', date: '1d ago', type: 'ACCESS', status: 'Approved' },
  { id: 'DSP-9755', title: 'Unrestricted WiFi', requester: 'Neelix', rank: 'Civilian', unit: 'Mess Hall', date: '3d ago', type: 'INTERNET', status: 'Rejected' },
];

// --- LAUNCHPAD NOTIFICATIONS ---

export const NOTIFICATIONS = [
  { id: 1, app: 'eAnumodan', title: 'Laptop Request #1044', status: 'Pending Approval', time: '10m ago', urgency: 'high' },
  { id: 2, app: 'eVigam', title: 'NWS Policy Update', status: 'Compliance Required', time: '1h ago', urgency: 'normal' },
  { id: 3, app: 'FVSCS', title: 'USS Voyager', status: 'Docking Request', time: '2h ago', urgency: 'normal' },
  { id: 4, app: 'eSamman', title: 'Transfer Orders', status: 'New Record', time: '4h ago', urgency: 'low' },
  { id: 5, app: 'eAnumodan', title: 'Asset Verification', status: 'Action Required', time: '5h ago', urgency: 'high' },
  { id: 6, app: 'NIC Mail', title: 'Storage Quota', status: '90% Full', time: '6h ago', urgency: 'normal' },
  { id: 7, app: 'eAnumodan', title: 'Software License', status: 'Expiring Soon', time: '1d ago', urgency: 'normal' },
];

// --- ADMIN OVERVIEW LOGS ---

export const MOCK_AUDIT_LOGS = [
  { id: 1, action: 'User Role Promotion', target: 'Lt. Barclay', actor: 'Adm. J. Doe', time: '10:42 AM', status: 'Success' },
  { id: 2, action: 'Failed Login Attempt', target: 'Unknown IP', actor: 'System', time: '10:38 AM', status: 'Warning' },
  { id: 3, action: 'Menu Configuration', target: 'NWS Policy', actor: 'Cmdr. Data', time: '09:15 AM', status: 'Success' },
  { id: 4, action: 'Database Backup', target: 'Primary Cluster', actor: 'Automated', time: '03:00 AM', status: 'Success' },
  { id: 5, action: 'Route Modification', target: 'Laptop Request', actor: 'Adm. J. Doe', time: 'Yesterday', status: 'Success' },
  { id: 6, action: 'Firewall Update', target: 'Perimeter Defense', actor: 'System', time: 'Yesterday', status: 'Success' },
  { id: 7, action: 'Access Denied', target: 'Restricted Files', actor: 'Ens. Crusher', time: '2 days ago', status: 'Warning' },
];

// Mock Notification Data with App Source and Navigation Links
export const notifications = [
    { id: 1, app: 'Cyber', title: 'New Policy Update', desc: 'NWS Policy #882 has been updated.', time: '10 mins ago', color: 'bg-red-500', link: { menu: 'nws-policy', sub: 'nws-inbox' } },
    { id: 2, app: 'Logistics', title: 'Action Required', desc: 'Laptop Request #1044 awaits approval.', time: '1 hour ago', color: 'bg-blue-500', link: { menu: 'laptop-request', sub: 'laptop-inbox' } },
    { id: 3, app: 'Dispensation', title: 'Request Approved', desc: 'Dispensation #D-992 approved.', time: '2 hours ago', color: 'bg-green-500', link: { menu: 'dispensation', sub: 'dispensation-inbox' } }
  ];


export const ASIDE_COLORS_MAP = {
  blue: {
    solid: 'bg-blue-500',
    darkBg: 'bg-blue-500/20',
    darkText: 'text-blue-400',
    lightBg: 'bg-blue-50',
    lightText: 'text-blue-600',
  },
  purple: {
    solid: 'bg-purple-500',
    darkBg: 'bg-purple-500/20',
    darkText: 'text-purple-400',
    lightBg: 'bg-purple-50',
    lightText: 'text-purple-600',
  },
  cyan: {
    solid: 'bg-cyan-500',
    darkBg: 'bg-cyan-500/20',
    darkText: 'text-cyan-400',
    lightBg: 'bg-cyan-50',
    lightText: 'text-cyan-600',
  },
  emerald: {
    solid: 'bg-emerald-500',
    darkBg: 'bg-emerald-500/20',
    darkText: 'text-emerald-400',
    lightBg: 'bg-emerald-50',
    lightText: 'text-emerald-600',
  },
  amber: {
    solid: 'bg-amber-500',
    darkBg: 'bg-amber-500/20',
    darkText: 'text-amber-400',
    lightBg: 'bg-amber-50',
    lightText: 'text-amber-600',
  },
};
