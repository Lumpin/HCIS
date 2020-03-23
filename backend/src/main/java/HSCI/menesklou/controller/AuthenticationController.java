package HSCI.menesklou.controller;

import HSCI.menesklou.entity.User;
import HSCI.menesklou.models.AuthenticationRequest;
import HSCI.menesklou.models.AuthenticationResponse;
import HSCI.menesklou.repositories.UserRepository;
import HSCI.menesklou.service.MyUserDetailsService;
import HSCI.menesklou.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class AuthenticationController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }


        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);
        User user = userRepository.findUserByUsername(userDetails.getUsername());
        return ResponseEntity.ok(new AuthenticationResponse(jwt,user.getRole().toString()));
    }
    @GetMapping("/test")
    @PreAuthorize("hasAnyRole('ADMIN','PATIENT')")
    public String test(){
        return "test";
    }

}
