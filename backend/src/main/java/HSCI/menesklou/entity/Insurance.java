package HSCI.menesklou.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Insurance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;

    @Column
    private String insuranceid;

}
