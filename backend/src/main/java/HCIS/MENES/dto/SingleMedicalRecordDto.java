package HCIS.MENES.dto;

import HCIS.MENES.entity.Appointments;
import HCIS.MENES.entity.Patient;
import HCIS.MENES.entity.Physician;
import HCIS.MENES.entity.Treatment;
import lombok.Data;

import java.util.List;

@Data
public class SingleMedicalRecordDto {
    private String recordName;
    Treatment treatment;
    private Physician physician;
    private Patient patient;
    private List<Appointments> appointments;
}
