import Sidebar from "../components/sidebar/Sidebar";
import { Outlet, useNavigation } from "react-router-dom";
import Topbar from "../components/topbar/Topbar";
import useDashboard from "../hooks/useDashboard";
import SkeletonTable from "../components/skeleton/Skeleton";

const Dashboard = () => {
  const { state } = useNavigation();
  const { isOpen, toggleSideBar } = useDashboard();

  let isLoading = state === 'loading'
  return (
    <main className="h-screen overflow-hidden flex">
      <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar} />
      <aside className="w-full overflow-y-auto">
        <Topbar toggleSideBar={toggleSideBar} />
        {isLoading ? <SkeletonTable /> : <Outlet />}
      </aside>
    </main>
  );
};

export default Dashboard;
