import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Scan, 
  Activity, 
  Torus, 
  FileText,
  Tags,
  Settings
} from 'lucide-react';

const navItems = [
  { name: 'Segmentation', path: '/segmentation', icon: Scan },
  { name: 'Classification', path: '/classification', icon: Tags, disabled: true },
  { name: 'Gait Analysis', path: '/gait', icon: Activity, disabled: true },
  { name: 'Pressure Map', path: '/pressure', icon: Torus, disabled: true },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col hidden md:flex">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">U</div>
          UlcerStar
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.disabled ? '#' : item.path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth
                ${isActive 
                  ? 'bg-indigo-600 text-white' 
                  : item.disabled 
                    ? 'text-slate-500 cursor-not-allowed opacity-50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <Icon size={20} />
              {item.name}
              {item.disabled && (
                <span className="ml-auto text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Soon</span>
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="px-3 py-2 text-slate-500 text-xs font-medium uppercase tracking-wider">
          UlcerStar v1.0.0
        </div>
      </div>
    </aside>
  );
};
