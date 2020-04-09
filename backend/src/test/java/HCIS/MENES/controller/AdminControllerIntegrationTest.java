package HCIS.MENES.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import HCIS.MENES.HCISApplication;
import HCIS.MENES.dto.AdminGetAllPatientDto;
import HCIS.MENES.dto.PhysicianCreateDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;

/*
    Integration test for the AdminController
 */
@SpringBootTest(classes = HCISApplication.class,
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AdminControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;


    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"ADMIN"})
    void createPhysician() {

        ResponseEntity<String> responseEntity = this.restTemplate
                .postForEntity("http://localhost:" + port + "/createPhysician", new PhysicianCreateDto(), String.class);
                assertEquals(403, responseEntity.getStatusCodeValue());
    }


    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"ADMIN"})
    void deletePhysician() {
        ResponseEntity<String> responseEntity = this.restTemplate
                .postForEntity("http://localhost:" + port + "/createPhysician", 1L, String.class);
        assertEquals(403, responseEntity.getStatusCodeValue());

    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"ADMIN"})
    void getAllPatients() {

        assertEquals(0, this.restTemplate
                .getForObject("http://localhost:" + port + "/admin/getallpatients", AdminGetAllPatientDto.class)
                .getGetAllPatientDtos().size());
    }


    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"ADMIN"})
    void deletePatient() {
        ResponseEntity<String> responseEntity = this.restTemplate
                .postForEntity("http://localhost:" + port + "/createPhysician", 1L, String.class);
        assertEquals(403, responseEntity.getStatusCodeValue());

    }
}
