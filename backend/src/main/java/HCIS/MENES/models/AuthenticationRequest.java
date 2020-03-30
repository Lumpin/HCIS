package HCIS.MENES.models;

import java.io.Serializable;

/*
    Model for the authentication request object, sets and gets username and password of users
 *
 */
public class AuthenticationRequest implements Serializable {

    private String username;
    private String password;

    /**
     *
     * @return username
     */
    public String getUsername() {
        return username;
    }

    /**
     *
     * @param username username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     *
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     *
     * @param password password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    //need default constructor for JSON Parsing
    public AuthenticationRequest()
    {

    }

    /**
     *
     * @param username username
     * @param password password
     */
    public AuthenticationRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }
}
