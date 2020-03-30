package HCIS.MENES.dto;

import lombok.Data;

/*  dto for passing patient information needed for registration

 */
@Data
public class PatientRegisterDTO {
    private String username;
    private String password;

}
