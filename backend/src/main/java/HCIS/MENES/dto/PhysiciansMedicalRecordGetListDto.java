package HCIS.MENES.dto;

import HCIS.MENES.entity.MedicalRecord;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/*  dto for passing a list of medical records

 */
@Data
public class PhysiciansMedicalRecordGetListDto {
    List<PhysiciansMedicalRecordGetDto> list = new ArrayList<>();

    /**
     * adds medical record  to physician medical record list
     * @param medicalRecord medical record which is added to list
     */
    public void addToList(MedicalRecord medicalRecord){
        list.add(new PhysiciansMedicalRecordGetDto(medicalRecord.getRecordName(),
                medicalRecord.getId(),
                medicalRecord.getPatient().getName(),medicalRecord.getPatient().getId()));
    }

}

/*  dto for passing information of a medical record, which is used by dto PhysiciansMedicalRecordGetListDto

 */
@AllArgsConstructor
@NoArgsConstructor
@Data
class PhysiciansMedicalRecordGetDto {
    private String recordName;
    private Long recordId;
    private String patientName;
    private Long patientId;
}