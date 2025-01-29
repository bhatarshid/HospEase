"use client"
import { ServiceGrid } from '@/Components/patient-dashboard/ServiceGrid';
import { WelcomeSection } from '@/Components/patient-dashboard/WelcomeSection'
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  let {profile, isLoading} = useSelector((state: RootState) => state.user);
 
  return (
    <div className="container flex flex-col lg:flex-row min-h-screen">
      <div className="flex-grow space-y-8 overflow-auto">
        <WelcomeSection userName={profile ? profile.firstName : 'User'} isLoading={isLoading} />
        <ServiceGrid service='dashboard'/>
      </div>
    </div>
  )
}

export default Dashboard