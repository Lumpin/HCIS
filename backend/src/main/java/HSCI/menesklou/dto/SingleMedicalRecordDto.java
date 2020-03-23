package HSCI.menesklou.dto;

import HSCI.menesklou.entity.Appointments;
import HSCI.menesklou.entity.Patient;
import HSCI.menesklou.entity.Physician;
import HSCI.menesklou.entity.Treatment;
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
