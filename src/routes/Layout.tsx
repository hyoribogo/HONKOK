import { Outlet } from 'react-router-dom';
import { useUser } from '~/hooks';

const Layout = () => {
  const { userIsLoading } = useUser();

  if (userIsLoading) return;

  return (
    <div className="mx-auto h-screen max-w-[767px] pb-24 pt-28 font-OAGothic">
      <Outlet />
    </div>
  );
};

export default Layout;
