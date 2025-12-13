import { Paper, Text, Group, Stack, Badge } from '@mantine/core';
import { IconMapPin, IconNavigation, IconCurrentLocation } from '@tabler/icons-react';

export function DeliveryMap({ address, customerName }: { address: string, customerName: string }) {
    return (
        <div className="bg-stone-900 text-green-400 p-4 rounded-lg shadow-inner border-4 border-stone-700 font-mono h-[400px] flex flex-col relative overflow-hidden">
            {/* Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* Radar Sweep Animation (simulated with CSS if possible, but static for now is fine) */}
            <div className="absolute inset-0 rounded-full border border-green-900/50 scale-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

            <Group justify="space-between" className="z-10 border-b border-green-800 pb-2 mb-4 bg-stone-900/80 backdrop-blur-sm">
                <Text tt="uppercase" fw={900} className="tracking-widest flex items-center gap-2">
                    <IconNavigation size={20} /> GPS Navigation
                </Text>
                <Badge color="green" variant="outline" className="animate-pulse">SIGNAL ACTIVE</Badge>
            </Group>

            <div className="flex-1 relative z-10 w-full h-full">
                {/* Mock Route Visual */}
                <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 4px rgba(0,255,0,0.5))' }}>
                    <path d="M 50,300 Q 150,150 300,100" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="10,5" className="animate-dash" />
                    <circle cx="50" cy="300" r="6" fill="currentColor" />
                    <circle cx="300" cy="100" r="6" fill="red" stroke="white" strokeWidth="2" />
                </svg>

                {/* Labels */}
                <div className="absolute bottom-10 left-4 bg-stone-800/90 p-2 border border-green-700 rounded text-xs">
                    <Text fw={700}>YOU (RIDER)</Text>
                    <Text c="dimmed">Speed: 45 km/h</Text>
                </div>

                <div className="absolute top-16 right-10 bg-stone-800/90 p-2 border border-red-700/50 rounded text-xs text-red-300">
                    <Text fw={700} className="flex items-center gap-1"><IconMapPin size={12} /> DESTINATION</Text>
                    <Text>{customerName}</Text>
                    <Text>{address}</Text>
                </div>
            </div>

            <div className="z-10 mt-auto pt-2 text-center text-xs opacity-50 border-t border-green-900">
                LAT: 40.7128 | LNG: -74.0060 | ETA: 8 MINS
            </div>
        </div>
    );
}
