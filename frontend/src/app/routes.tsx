import { Routes, Route, Navigate } from 'react-router-dom';
import Segmentation from '../pages/Segmentation';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/segmentation" replace />} />
      <Route path="/segmentation" element={<Segmentation />} />
      <Route path="*" element={<Navigate to="/segmentation" replace />} />
    </Routes>
  );
};

export default AppRoutes;
