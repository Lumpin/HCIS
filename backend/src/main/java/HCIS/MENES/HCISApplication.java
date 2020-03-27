package HCIS.MENES;

import HCIS.MENES.constant.Roles;
import HCIS.MENES.filters.JwtRequestFilter;
import HCIS.MENES.repositories.PhysicianRepository;
import HCIS.MENES.repositories.UserRepository;
import HCIS.MENES.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.annotation.PostConstruct;
import java.util.Optional;


/* Main application of the backend; configures the web security and creates a initial admin user with username: admin and password: admin
	--> runs the  application

 */
@SpringBootApplication
public class HCISApplication {

	@Autowired
	private PhysicianRepository physicianRepository;
	@Autowired
	private UserRepository userRepository;
	public static void main(String[] args) {
		SpringApplication.run(HCISApplication.class, args);

	}

	@PostConstruct
	private void init(){
		Optional<User> adminCheck = userRepository.findById((long)1);
		if(!adminCheck.isPresent()) {
			User user = new User();
			user.setUsername("admin");
			user.setPassword("admin");
			user.setRole(Roles.ADMIN);
			userRepository.save(user);
		}
	}

	/*
		class for configuring web security
	 */
	@Configuration
	@EnableWebSecurity
	@EnableGlobalMethodSecurity(prePostEnabled = true)
	class WebSecurityConfig extends WebSecurityConfigurerAdapter {
		@Autowired
		private UserDetailsService myUserDetailsService;
		@Autowired
		private JwtRequestFilter jwtRequestFilter;

		/**
		 *
		 * @param auth
		 * @throws Exception
		 */
		@Autowired
		public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
			auth.userDetailsService(myUserDetailsService);
		}

		/**
		 *
		 * @return
		 */
		@Bean
		public PasswordEncoder passwordEncoder() {
			return NoOpPasswordEncoder.getInstance();
		}

		/**
		 *
		 * @return
		 * @throws Exception
		 */
		@Override
		@Bean
		public AuthenticationManager authenticationManagerBean() throws Exception {
			return super.authenticationManagerBean();
		}

		/**
		 *
		 * @param httpSecurity
		 * @throws Exception
		 */
		@Override
		protected void configure(HttpSecurity httpSecurity) throws Exception {

			httpSecurity.csrf().disable().
					authorizeRequests().antMatchers("/authenticate","/register/**").permitAll().
					anyRequest().authenticated().and().
					exceptionHandling().and().sessionManagement()
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
			httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

		}

		/**
		 *
		 * @return
		 */
		@Bean
		public ModelMapper modelMapper() {
			return new ModelMapper();
		}
	}


}
