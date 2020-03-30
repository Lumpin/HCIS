package HCIS.MENES.dto;

import lombok.Data;

import java.util.Date;

/*  dto for passing patient information saved on patient details site

 */
@Data
public class PatientResponseDto {

    private String name;

    private String surname;

    private String email;

    private Date date;

    private String gender;

    private String address;

    private Long phoneNumber;

}
