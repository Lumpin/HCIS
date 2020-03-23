package HCIS.MENES.dto;

import lombok.Data;

import javax.persistence.Column;
import java.util.Date;

@Data
public class PatientDetailsDto {
    @Column
    private String name;

    private String surname;

    private String email;

    private Date date;

    private String gender;

    private String address;

    private Long phoneNumber;
}
