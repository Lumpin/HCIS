package HCIS.MENES.controller;

import HCIS.MENES.constant.Roles;
import HCIS.MENES.dto.PhysicianCreateDto;
import HCIS.MENES.entity.Physician;
import HCIS.MENES.entity.User;
import HCIS.MENES.repositories.MedicalRecordRespository;
import HCIS.MENES.repositories.PatientRepository;
import HCIS.MENES.repositories.PhysicianRepository;
import HCIS.MENES.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.RequestBody;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class AdminControllerTest {

    @Autowired
    private MockMvc mvc;

    @InjectMocks
    AdminController adminController;

    @Mock
    PatientRepository patientRepository;
    @Mock
    MedicalRecordRespository medicalRecordRepository;
    @Mock
    PhysicianRepository physicianRepository;
    @Mock
    UserRepository userRepository;
    @Mock
    PhysicianCreateDto physicianCreateDto;
    @Autowired
    private ObjectMapper objectMapper;

    @Before
    public void setup() {
        this.mvc = standaloneSetup(new AdminController()).build();
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"ADMIN"})
    void createPhysician() throws Exception {
        this.mvc.perform(post("/createPhysician")
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(physicianCreateDto)))
                .andExpect(status().isOk());
    }


    /*
    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"ADMIN"})
    void deletePhysician() throws Exception {

        Long physicianId = (long) 1234;

        this.mvc.perform(post("/deletePhysician")
                .contentType(MediaType.APPLICATION_JSON).content("physicianId"))
                .andExpect(status().isOk());
    }
*/
    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"ADMIN"})
    void getAllPatients() throws Exception {
        this.mvc.perform(get("/admin/getallpatients")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    /*
    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"ADMIN"})
    void deletePatient() throws Exception {

        Long patientId = (long) 1;
        this.mvc.perform(post("/admin/deletePatient")
                .contentType(MediaType.APPLICATION_JSON).content("patientId: 1233"))
                .andExpect(status().isOk());
    }

     */
}