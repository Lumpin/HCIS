package HCIS.MENES.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;

/* Entity for the physician object consisting of id, name, surname, email, address and phonenumber

 */
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

    private Long phoneNumber;

    @OneToOne
    @JsonIgnore
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private User user;
}
