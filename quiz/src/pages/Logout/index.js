import { useNavigate } from "react-router-dom";
import { deleteCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../Actions/login";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  deleteCookies();

  useEffect(() => {
    dispatch(checkLogin(false));
    navigate("/login");
  }, []);

  return <></>;
}
export default Logout;
