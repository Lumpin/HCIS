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

    /* dto of medical list
     */
    @Data
    private  class MedicalListDto{
        private Long id;
        private Long physicianId;
        private  String physicianName;

    }

    /**
     * makes dto of medical record list
     *
     * @param list list of medical records
     */
    public void makeMedicalRecordDtoList(List<MedicalRecord> list){
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
