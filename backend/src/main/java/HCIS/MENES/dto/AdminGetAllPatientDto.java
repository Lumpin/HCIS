package HCIS.MENES.dto;

import HCIS.MENES.entity.Patient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/*
    Data Transfer Object of relevant information of user for a admin
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminGetAllPatientDto {
    private List<GetPatientDto>  getAllPatientDtos= new ArrayList<>();

    /**
     * adds a patient
     * @param patient Patient object
     */
    public void add(Patient patient){
        GetPatientDto getPatientDto = new GetPatientDto();
        getPatientDto.id = patient.getId();
        getPatientDto.email= patient.getEmail();
        getPatientDto.name = patient.getName();
        getPatientDto.surname = patient.getSurname();
        getAllPatientDtos.add(getPatientDto);
    }


    /*
     * dto for getting patient
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    class GetPatientDto {
        private long id;
        private String name;
        private String surname;
        private String email;

    }
}
