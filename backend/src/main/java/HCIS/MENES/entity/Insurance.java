package HCIS.MENES.entity;

import lombok.Data;

import javax.persistence.*;

/* Entity for the insurance details object consisting of id and name

 */
@Data
@Entity
public class Insurance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;

    @Column
    private String insuranceId;

}
