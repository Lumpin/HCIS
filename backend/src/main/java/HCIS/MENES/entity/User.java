package HCIS.MENES.entity;

import HCIS.MENES.constant.Roles;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/*
    Entity for the user consist of id, username, password and role; can be disabled or enabled
 */
@Data
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;
    @Column
    private String password;
    @Column
    private Roles role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();

        list.add(new SimpleGrantedAuthority("ROLE_" + role.toString()));

        return list;
    }

    /**
     *
     * @return String of password of user
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     *
     * @return String of username of user
     */
    @Override
    public String getUsername() {
        return username;
    }

    /**
     *
     * @return false
     */
    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    /**
     *
     * @return false
     */
    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    /**
     *
     * @return false
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    /**
     *
     * @return false
     */
    @Override
    public boolean isEnabled() {
        return false;
    }


}
