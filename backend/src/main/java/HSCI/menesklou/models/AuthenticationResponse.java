package HSCI.menesklou.models;

import HSCI.menesklou.constant.Roles;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable {

    private final String jwt;
    private final Roles role;
    public AuthenticationResponse(String jwt,String role) {
        this.jwt = jwt;
        this.role = Roles.valueOf(role);
    }


    public String getJwt() {
        return jwt;
    }
    public String getRole(){
        return role.toString();
    }
}
