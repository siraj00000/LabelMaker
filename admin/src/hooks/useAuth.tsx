import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

type roleTypes = 'Super Admin' | 'Company Admin' | 'Manufacturer Admin' | 'User'

const useAuth = () => {
    // authToken is a JWT, getting form the cookie
    const cookies = Cookies.get('authToken');
    let role: roleTypes = 'User';
    if (cookies) {
        // decode JWT token extract role of the user
        const decodeToken = jwtDecode(cookies) as { role: roleTypes };
        role = decodeToken.role
    }
    return { role }
}
export default useAuth