package HSCI.menesklou.dto;

import lombok.Data;

@Data
public class PhysicianGetResponseDto {
    private String name;
    private String surname;
    private String email;
    private String address;
    private String phonenumber;
}
