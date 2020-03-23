package HSCI.menesklou.dto;

import HSCI.menesklou.entity.MedicalRecord;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
public class PhysiciansMedicalRecordGetListDto {
    List<PysiciansMedicalRecordGetDto> list = new ArrayList<>();

    public void addToList(MedicalRecord medicalRecord){
        list.add(new PysiciansMedicalRecordGetDto(medicalRecord.getRecordName(),
                medicalRecord.getId(),
                medicalRecord.getPatient().getName(),medicalRecord.getPatient().getId()));
    }

}
@AllArgsConstructor
@NoArgsConstructor
@Data
class  PysiciansMedicalRecordGetDto{
    private String recordName;
    private Long recordId;
    private String patientName;
    private Long patientId;
}