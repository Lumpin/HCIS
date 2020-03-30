package HCIS.MENES.dto;

import lombok.Data;

/* dto for passing response information filled out by physicians

 */
@Data
public class PhysicianGetResponseDto {
    private String name;
    private String surname;
    private String email;
    private String address;
    private String phoneNumber;
}
