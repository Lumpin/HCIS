package HCIS.MENES.dto;

import HCIS.MENES.entity.Physician;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/* dto for passing a list of all physician data

 */
@Data
public class GetAllPhysiciansDto {

   List<PhysicianListDto> physiciansData = new ArrayList<>();

    /**
     * creates dto of physicians list
     *
     * @param physicians List of physicians
     */
    public  void createPhysicianListDto(List<Physician> physicians){
        for (Physician phy:physicians
             ) {
            PhysicianListDto temp = new PhysicianListDto();
            temp.id = phy.getId();
            temp.name = phy.getName();
            temp.email=phy.getEmail();
            temp.surname=phy.getSurname();
            physiciansData.add(temp);

        }

    }

    /*  dto for physician list

     */
    @Data
    private class PhysicianListDto{
        private Long id;
        private String name;
        private String surname;
        private String email;
    }
}
