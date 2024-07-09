import { setCookie } from "../../helpers/cookie";
import { login } from "../../services/usersService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../Actions/login";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const response = await login(email, password);
    console.log(response);
    if (response.length > 0) {
      dispatch(checkLogin(true));
      setCookie("id", response[0].id, 1);
      setCookie("fullName", response[0].fullName, 1);
      setCookie("email", response[0].email, 1);
      setCookie("token", response[0].token, 1);
      navigate("/");
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác");
    }
    // console.log(e.target[0].value);
    // console.log(e.target[1].value);
  };
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="email" placeholder="Nhập email" required />
        </div>
        <div>
          <input type="password" placeholder="Nhập mật khẩu" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
export default Login;
