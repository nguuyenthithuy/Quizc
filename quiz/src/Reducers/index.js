import { combineReducers } from "redux";
import loginReducer from "./login";

const allReducer = combineReducers({
  loginReducer,

  // Thêm nhiều reducer vào đây
});
export default allReducer;
