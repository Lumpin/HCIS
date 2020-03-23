package HSCI.menesklou.dto;

import HSCI.menesklou.entity.MedicalRecord;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class GetMedicalRecordDtoList {
    private List<MedicalListDto> medicalListDtoList = new ArrayList<>();
    @Data
    private  class MedicalListDto{
        private Long id;
        private Long physicianId;
        private  String physicianName;

    }
    public void makeMedicalRedorcDtoList(List<MedicalRecord> list){
        for (MedicalRecord medicalRecord: list
             ) {
            MedicalListDto temp = new MedicalListDto();
            temp.setId(medicalRecord.getId());
            temp.setPhysicianId(medicalRecord.getPhysician().getId());
            temp.setPhysicianName(medicalRecord.getPhysician().getName());
            medicalListDtoList.add(temp);
        }
    }
}
