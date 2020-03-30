package HCIS.MENES.dto;

import lombok.Data;

/* dto for passing update information filled out by physicians

 */
@Data
public class PhysicianUpdateDto {
    private String name;
    private String surname;
    private String email;
    private String address;
    private String phoneNumber;

}
