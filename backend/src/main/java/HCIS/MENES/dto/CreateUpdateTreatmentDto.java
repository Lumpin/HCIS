package HCIS.MENES.dto;

import HCIS.MENES.constant.Status;
import lombok.Data;

import java.util.Date;

/* dto for passing information for creating a new treatment

 */
@Data
public class CreateUpdateTreatmentDto {
    private Date treatmentDate;

    private String locationOfTreatment;

    private String anamneses;

    private String medicalFindings;

    private String medicalLetter;

    private String diagnoses;

    private String medications;

    private Status status;
}
