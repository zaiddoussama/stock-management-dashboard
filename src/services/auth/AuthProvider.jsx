import Login from "../../pages/Login/Login"
import { isLogged } from "./authService"

function AuthProvider({children , config}) {
  return isLogged() ? children : <Login config={config}/>
}

export default AuthProvider