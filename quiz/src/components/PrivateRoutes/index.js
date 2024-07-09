import { Navigate, Outlet } from "react-router-dom";

function Private() {
  const isLogin = true;
  return <>{isLogin ? <Outlet /> : <Navigate to={"/login"} />}</>;
}
export default Private;
