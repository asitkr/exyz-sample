import { BadgeVariant } from "../../utils/types";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ElementType;
  className?: string;
  animate?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  onClick?: () => void;
}

export interface NotFoundPageProps {
  onGoHome: () => void;
  onBack: () => void;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  sublabel?: string;
  error?: string;
  icon?: React.ElementType;
}

export interface CommandPaletteProps {
  isOpen: boolean; 
  onClose: () => void;
  // onNavigate: (moduleId: string, context?: { workflow: string; subMenu?: string }) => void;
  // toggleTheme: () => void;
  // onLogout: () => void;
  // isDarkMode: boolean;
}

export interface CommandOption {
  id: string;
  label: string;
  group: 'Navigation' | 'Actions' | 'System';
  icon: React.ElementType;
  shortcut?: string[];
  action: () => void;
}