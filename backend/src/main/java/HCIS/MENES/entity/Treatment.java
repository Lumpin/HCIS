package HCIS.MENES.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

/* Entity for a treatment object

 */

@Data
@Entity
public class Treatment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date treatmentDate;

    private String locationOfTreatment;

    private String anamneses;

    private String medicalFindings;

    private String medicalLetter;

    private String diagnoses;

    private String medications;

}
