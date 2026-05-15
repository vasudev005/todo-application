import {
  BarChart3,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Bell,
  Settings,
  Trash2,
  Briefcase,
  GraduationCap,
  Dumbbell,
  UserRound,
  KanbanSquare
} from 'lucide-react';

export const primaryNav = [
  { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Today', to: '/app/today', icon: ClipboardList },
  { label: 'Upcoming', to: '/app/upcoming', icon: CalendarDays },
  { label: 'Task Board', to: '/app/kanban', icon: KanbanSquare },
  { label: 'AI Summary', to: '/app/ai-summary', icon: BrainCircuit },
  { label: 'Analytics', to: '/app/analytics', icon: BarChart3 },
  { label: 'Calendar', to: '/app/calendar', icon: CalendarDays },
  { label: 'Notifications', to: '/app/notifications', icon: Bell }
];

export const workspaceNav = [
  { label: 'Personal', to: '/app/category/personal', icon: UserRound },
  { label: 'Work', to: '/app/category/work', icon: Briefcase },
  { label: 'Learning', to: '/app/category/learning', icon: GraduationCap },
  { label: 'Fitness', to: '/app/category/fitness', icon: Dumbbell },
  { label: 'Completed', to: '/app/completed', icon: CheckCircle2 },
  { label: 'Trash', to: '/app/trash', icon: Trash2 },
  { label: 'Settings', to: '/app/settings', icon: Settings },
  { label: 'Profile', to: '/app/profile', icon: FolderOpen },
  { label: 'Logout', action: 'logout', icon: LogOut }
];
