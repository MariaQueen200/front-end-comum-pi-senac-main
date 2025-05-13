import React from 'react';
import Topbar from './Topbar';
import ContentArea from './ContentArea';

interface MainContentProps {
  toggleSidebar: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ toggleSidebar }) => {
  return (
    <div className="flex flex-col flex-1">
      <Topbar toggleSidebar={toggleSidebar} />
      <ContentArea />
    </div>
  );
};

export default MainContent;
