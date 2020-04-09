package HCIS.MENES.controller;

import HCIS.MENES.dto.PhysicianCreateDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

/*
    Unit tests for the admin controller

 */
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class AdminControllerTest {

    @Autowired
    private MockMvc mvc;

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



    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"ADMIN"})
    void deletePhysician() throws Exception {

        Long physicianId = (long) 1234;

        this.mvc.perform(post("/deletePhysician")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(400));

    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"ADMIN"})
    void getAllPatients() throws Exception {
        this.mvc.perform(get("/admin/getallpatients")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }


    @Test
    @WithMockUser(username = "admin", password = "admin", roles = {"ADMIN"})
    void deletePatient() throws Exception {

        this.mvc.perform(post("/admin/deletePatient")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(400));


    }


}