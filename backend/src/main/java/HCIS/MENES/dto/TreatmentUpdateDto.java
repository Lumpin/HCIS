package HCIS.MENES.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/*  dto for passing information for updating/creating a treatment

 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentUpdateDto {
    private Date treatmentDate;
    private String locationOfTreatment;
    private String anamneses;
    private String medicalFindings;
    private String medicalLetter;
    private String diagnoses;
    private String medications;

}
