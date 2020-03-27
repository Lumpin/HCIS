package HCIS.MENES.entity;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

/* Entity for authority object consisting of a String containing the authority and an id

 */

@Data
@Entity
public class Authority implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String authority;

    /**
     *
     * @return
     */
    @Override
    public String getAuthority() {
        return authority;
    }

    /**
     *
     * @return
     */
    @Override
    public String toString() {
        return "Authority{" +
                "id=" + id +
                ", authority=" + authority +
                '}';
    }
}
