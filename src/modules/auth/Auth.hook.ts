import { useContext } from "react";
import AuthContext from "./Auth.context";

const useAuth = () => useContext(AuthContext);
export default useAuth;