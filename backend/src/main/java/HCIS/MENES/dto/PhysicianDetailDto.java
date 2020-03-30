package HCIS.MENES.dto;

import lombok.Data;

/* dto for passing physician information

 */
@Data
public class PhysicianDetailDto {
    private String name;
    private String surname;
    private String email;
    private String address;
    private String phoneNumber;
}
