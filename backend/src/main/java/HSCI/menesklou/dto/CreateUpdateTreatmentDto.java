package HSCI.menesklou.dto;

import HSCI.menesklou.constant.Status;
import lombok.Data;

import java.util.Date;

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
