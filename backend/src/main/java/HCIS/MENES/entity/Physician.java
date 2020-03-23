package HCIS.MENES.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;

@Data
@Entity
public class Physician {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String surname;

    private String email;

    private String address;

    private Long phonenumber;

    @OneToOne
    @JsonIgnore
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private User user;
}
