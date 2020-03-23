package HCIS.MENES.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class UnApprovedAppoints {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;

    @OneToOne
    private Physician physician;

    @OneToOne
    private MedicalRecord medicalRecord;

    public UnApprovedAppoints() {
    }
}
