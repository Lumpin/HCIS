package HCIS.MENES.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Date;

/* Entity for the patient object consisting of id, name, surname, email, date, gender, address, phoneNumber and an insurance object

 */

@Data
@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String surname;

    @Column
    private String email;

    @Column
    private Date date;

    @Column
    private String gender;

    @Column
    private String address;

    @Column
    private Long phoneNumber;

    @OneToOne
    @JsonIgnore
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private User user;

    @OneToOne
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Insurance insurance;
}
