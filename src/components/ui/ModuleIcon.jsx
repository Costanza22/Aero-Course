import {
  Plane,
  Settings,
  Compass,
  CloudSun,
  ClipboardList,
  Wrench,
} from 'lucide-react';

const BY_ID = {
  1: Plane,
  2: Settings,
  3: Compass,
  4: CloudSun,
  5: ClipboardList,
  6: Wrench,
};

export function ModuleIcon({ id, size = 28, className, strokeWidth = 1.75 }) {
  const Icon = BY_ID[id] || Plane;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden />;
}
