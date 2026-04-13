import { Card } from '../components/ui/Card';
import { 
  Scan, 
  TrendingUp, 
  Users, 
  Calendar,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const stats = [
  { name: 'Active Patients', value: '42', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Tests This Week', value: '156', icon: Scan, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { name: 'Healing Rate', value: '+12.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Pending Reviews', value: '8', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const Home = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="p-0">
              <div className="p-6 flex items-center gap-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card title="Recent Activity" description="Latest patient scans and reports.">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-smooth">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Patient #1000{i*15}</p>
                      <p className="text-xs text-slate-500">Segmentation Scan • 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card title="Quick Actions">
            <div className="space-y-3">
              <Link to="/segmentation">
                <Button className="w-full justify-start py-6">
                  <Scan size={20} className="mr-3" />
                  New Wound Analysis
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start py-6 opacity-50 cursor-not-allowed">
                <Users size={20} className="mr-3" />
                Register New Patient
              </Button>
            </div>
          </Card>

          <div className="bg-indigo-600 rounded-xl p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">UlcerStar AI</h3>
              <p className="text-sm text-indigo-100 leading-relaxed mb-4">
                Our latest model has been updated with 15k new training samples.
              </p>
              <Button size="sm" className="bg-white text-indigo-600 hover:bg-indigo-50 border-none">
                Read Release Notes
              </Button>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
