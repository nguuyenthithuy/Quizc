import { generateToken } from "../../helpers/generateToken";
import { checkExit, register } from "../../services/usersService";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const checkExitEmail = await checkExit("email", email);
    console.log(checkExitEmail);
    if (checkExitEmail.length > 0) {
      alert("Email đã tồn tại");
    } else {
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken(),
        // token:
      };
      const response = await register(options);
      console.log(response);
      // const response = await login(email, password);
      // console.log(response);
      if (response) {
        navigate("/login");
      } else {
        alert("Đăng kí thất bại");
      }
    }

    // console.log(e.target[0].value);
    // console.log(e.target[1].value);
  };
  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="Nhập fullName" required />
        </div>
        <div>
          <input type="email" placeholder="Nhập email" required />
        </div>
        <div>
          <input type="password" placeholder="Nhập mật khẩu" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
export default Register;
