package HCIS.MENES.dto;

import HCIS.MENES.entity.MedicalRecord;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/* dto for passing a array list of medical records

 */
@Data
public class GetMedicalRecordDtoList {

    private List<MedicalListDto> medicalListDtoList = new ArrayList<>();
    @Data

    private  class MedicalListDto{
        private Long id;
        private Long physicianId;
        private  String physicianName;

    }

    /**
     *
     * @param list
     */
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
