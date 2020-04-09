package HCIS.MENES.service;


import HCIS.MENES.constant.Roles;
import HCIS.MENES.repositories.UserRepository;
import HCIS.MENES.entity.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.userdetails.UserDetails;


import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

/*
    Unit tests for the user service
 */
@RunWith(MockitoJUnitRunner.class)
public class MyUserDetailsServiceTest {

    @InjectMocks
    MyUserDetailsService myUserService;

    @Mock
    UserRepository userRepository;

    @Before
    public void init(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void loadUserByUsername(){

        User test = new User();
        test.setUsername("Peter");
        test.setPassword("12345");
        test.setRole(Roles.PATIENT);

        when(userRepository.findUserByUsername("Peter")).thenReturn(test);

        UserDetails user1 = myUserService.loadUserByUsername("Peter");

        assertEquals("Peter", user1.getUsername());
        assertEquals("12345", user1.getPassword());

    }
}