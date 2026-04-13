import { Bell, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const titles: Record<string, string> = {
  '/': 'Dashboard Overview',
  '/segmentation': 'Image Segmentation',
  '/gait': 'Gait Analysis',
  '/pressure': 'Pressure Mapping',
  '/report': 'Clinical Reports',
};

export const Navbar = () => {
  const location = useLocation();
  const currentTitle = titles[location.pathname] || 'UlcerStar';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
      <h2 className="text-lg font-semibold text-slate-800">{currentTitle}</h2>
      
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-indigo-600 transition-smooth hover:bg-indigo-100">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};
