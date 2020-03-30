package HCIS.MENES.models;

import HCIS.MENES.constant.Roles;

import java.io.Serializable;

/* Model for the authentication response object
 *
 */
public class AuthenticationResponse implements Serializable {

    private final String jwt;
    private final Roles role;

    /**
     *
     * @param jwt String of jwt token
     * @param role String of role
     */
    public AuthenticationResponse(String jwt, String role) {
        this.jwt = jwt;
        this.role = Roles.valueOf(role);
    }


    /**
     *
     * @return String of jwt token
     */
    public String getJwt() {
        return jwt;
    }

    /**
     *
     * @return String of role
     */
    public String getRole(){
        return role.toString();
    }
}
