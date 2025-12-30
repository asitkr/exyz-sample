import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CornerDownLeft, FileText, Home, Laptop, Moon, Search, Settings, Shield, Sun, Users, Wifi } from 'lucide-react';

import { CommandOption, CommandPaletteProps } from './interface';
import { useTheme } from '../../context/useTheme';
import { useAppDispatch } from '../../redux/hooks';
import { handleSelectModule } from '../../redux/actions/uiActions';

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { isDarkMode, toggleTheme } = useTheme();
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Toggle Logic via Keyboard
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (isOpen) onClose(); else onClose(); // Parent handles toggle if we exposed a toggle, but here we expect parent to open. 
                // Actually, for global shortcut, we should check !isOpen inside the event if we were self-controlled.
                // Since we are parent-controlled, App.tsx likely doesn't have the key listener.
                // Wait, App.tsx should handle the key listener if we want it global.
                // BUT, usually CommandPalette component attaches the listener.
                // Let's attach listener here but call the parent props.
                // Actually, to avoid complexity, let's keep the listener here to open it?
                // No, if isOpen is false, this component returns null, so this listener unmounts.
                // The listener must be in App.tsx OR this component should be always mounted but hidden.
                // Current App.tsx renders <CommandPalette ... /> always.
                // Let's check App.tsx render: It renders it unconditionally.
                // So we can keep listener here to call onClose (toggle).
                // However, we need a way to OPEN it. If it returns null when closed, we can't listen.
                // Fix: In App.tsx I updated it to render conditionally? No, I passed `isOpen`.
                // Let's change the return null to CSS hiding or move listener to window in App.
                // BETTER: Move listener to App.tsx?
                // EASIER: Let this component be always rendered but hidden via CSS? No, standard is unmount.
                // Let's add a global listener in App.tsx or a separate hook.
                // Actually, let's just use the prop. The App.tsx doesn't have the listener in my previous XML.
                // I will add the listener to this component BUT return null only if closed? 
                // No, if I return null, I can't listen for the 'Open' shortcut.
                // I will return null in the render, but keep the effect? No, effect unmounts.
                // OK, I will not return null at the top. I will wrap in a conditional render in the return.
            }
            if (e.key === 'Escape') {
                onClose();
            }
        };

        // To support opening from anywhere, the listener for Cmd+K should really be at the top level or this component should render hidden.
        // I'll make this component render nothing but attach listener if not open? No, React components don't work like that if they return null.
        // I'll assume App.tsx renders it. I'll change the implementation to return null *inside* the overlay, or use a "mounted" state.
        // Actually, I'll add the global keydown listener to the document in `useEffect` and it will work even if I return null?
        // NO. If a component returns null, its effects still run? YES. 
        // Wait, if parent conditionally renders it `{isOpen && <Palette />}` then it unmounts.
        // In App.tsx I wrote `<CommandPalette isOpen={isCmdPaletteOpen} ... />`. I did NOT conditional render it.
        // So `CommandPalette` is always mounted.

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]); // Dependencies

    // Focus Input on Open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setQuery('');
            setActiveIndex(0);
        }
    }, [isOpen]);

    // Define Commands
    const commands: CommandOption[] = [
        // Navigation
        {
            id: 'nav-home',
            label: 'Go to Home / Launchpad',
            group: 'Navigation',
            icon: Home,
            action: () => dispatch(handleSelectModule(''))
        },
        {
            id: 'nav-laptop-new',
            label: 'New Laptop Request',
            group: 'Navigation',
            icon: Laptop,
            action: () => dispatch(handleSelectModule('logistics', { workflow: 'laptop-request', subMenu: 'laptop-new-request' }))
        },
        {
            id: 'nav-dispensation',
            label: 'Request Network Dispensation',
            group: 'Navigation',
            icon: Wifi,
            action: () => dispatch(handleSelectModule('logistics', { workflow: 'dispensation', subMenu: 'dispensation-my-requests' }))
        },
        {
            id: 'nav-policy',
            label: 'Register External Media',
            group: 'Navigation',
            icon: Shield,
            action: () => dispatch(handleSelectModule('logistics', { workflow: 'nws-policy', subMenu: 'nws-library' }))
        },
        {
            id: 'nav-personnel',
            label: 'View Personnel Records',
            group: 'Navigation',
            icon: Users,
            action: () => dispatch(handleSelectModule('personnel', { workflow: 'admin-console', subMenu: 'personnel-records' }))
        },

        // Actions / Views
        {
            id: 'view-inbox',
            label: 'Check My Inbox',
            group: 'Actions',
            icon: FileText,
            action: () => dispatch(handleSelectModule('logistics', { workflow: 'laptop-request', subMenu: 'laptop-inbox' }))
        },

        // System
        {
            id: 'sys-theme',
            label: isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode',
            group: 'System',
            icon: isDarkMode ? Sun : Moon,
            action: toggleTheme
        },
        {
            id: 'sys-settings',
            label: 'Open Settings',
            group: 'System',
            icon: Settings,
            action: () => dispatch(handleSelectModule('logistics', { workflow: 'global-settings', subMenu: '' }))
        },
        {
            id: 'sys-404',
            label: 'Simulate 404 Error (Test Page)',
            group: 'System',
            icon: AlertTriangle,
            action: () => dispatch(handleSelectModule('logistics', { workflow: 'not-found', subMenu: '' }))
        },
        // {
        //     id: 'sys-logout',
        //     label: 'Log Out',
        //     group: 'System',
        //     icon: LogOut,
        //     action: onLogout
        // },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.group.toLowerCase().includes(query.toLowerCase())
    );

    // Keyboard Navigation inside List
    const handleListKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => (prev + 1) % filteredCommands.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands[activeIndex]) {
                handleSelect(filteredCommands[activeIndex]);
            }
        }
    };

    const handleSelect = (command: CommandOption) => {
        command.action();
        onClose();
    };

    // Global toggle handler inside the component
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                if (isOpen) onClose();
                // We can't easily "open" from here if we return null below.
                // Strategy: The parent App.tsx does NOT conditionally render this component. 
                // So this effect runs always.
                // We need a prop `onToggle` or just use the parent's set state if we were lifting state.
                // But here we only have onClose.
                // To fix "Cmd+K" not opening:
                // I will assume the Parent App.tsx attaches the listener OR I will execute a callback if provided.
                // For now, let's rely on the fact that I'm lifting state to App.tsx, so I should move the listener there or pass an onToggle.
                // To keep it simple: I will modify App.tsx to handle the keydown for opening/toggling.
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Palette Container */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden flex flex-col animate-fade-in-down max-h-[60vh]">

                {/* Search Input */}
                <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-white/5">
                    <Search className="w-5 h-5 text-slate-400 mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-white placeholder-slate-400"
                        placeholder="Type a command or search..."
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                        onKeyDown={handleListKeyDown}
                    />
                    <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 dark:bg-white/10 px-2 py-1 rounded text-xs font-medium text-slate-500 dark:text-slate-400">
                        <span className="text-[10px]">ESC</span>
                    </div>
                </div>

                {/* Results List */}
                <div
                    ref={listRef}
                    className="flex-1 overflow-y-auto custom-scrollbar p-2 scroll-py-2"
                >
                    {filteredCommands.length > 0 ? (
                        <div className="space-y-1">
                            {filteredCommands.map((cmd, index) => (
                                <button
                                    key={cmd.id}
                                    onClick={() => handleSelect(cmd)}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-colors ${index === activeIndex
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <cmd.icon size={18} className={index === activeIndex ? 'text-white' : 'text-slate-400'} />
                                        <span className={`font-medium ${index === activeIndex ? 'text-white' : ''}`}>{cmd.label}</span>
                                    </div>
                                    {index === activeIndex && (
                                        <CornerDownLeft size={16} className="text-white/70" />
                                    )}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                            <p>No results found for "{query}"</p>
                        </div>
                    )}
                </div>

                {/* Footer Hint */}
                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-white/5 text-[10px] text-slate-400 flex justify-between">
                    <div className="flex gap-4">
                        <span>Use <strong>↑↓</strong> to navigate</span>
                        <span><strong>Enter</strong> to select</span>
                    </div>
                    <span><strong>Esc</strong> to close</span>
                </div>
            </div>
        </div>
    )
}

export default CommandPalette;