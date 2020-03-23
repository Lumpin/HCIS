package HCIS.MENES.entity;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Data
@Entity
public class Authority implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String authority;

    @Override
    public String getAuthority() {
        return authority;
    }

    @Override
    public String toString() {
        return "Authority{" +
                "id=" + id +
                ", authority=" + authority +
                '}';
    }
}
