package com.web.book.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.web.book.security.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
public class FormLoginSecurityConfig {
	@Autowired
	private CustomAccessDeniedHandler customAccessDeniedHandler;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}
	
	@Bean
	DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsServiceImpl);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http.csrf().disable().authorizeHttpRequests((authorizeRequests) -> authorizeRequests.requestMatchers("/*", "/admin/*", "admin/account/*", "/admin/account/edit/*", "/login", "/register", "/403", "/css/**", "/images/**").permitAll()
																			.requestMatchers("/admin/login", "/admin/register", "/webjars/**").permitAll()
																			.requestMatchers("/api/**", "/api/books/*","/api/order","/api/order/*","/api/auth/login").permitAll()
																			.anyRequest().authenticated())
//		.formLogin((formLogin) -> formLogin
//				.usernameParameter("username")
//				.passwordParameter("password")
//				.loginPage("/login")
//				.defaultSuccessUrl("/", true)
//				.failureUrl("/login?error=true").permitAll()
//				)
		.formLogin((formAdminLogin) -> formAdminLogin
				.usernameParameter("username")
				.passwordParameter("password")
				.loginPage("/admin/login")
				.defaultSuccessUrl("/admin/account", true)
				.failureUrl("/admin/login?error=true").permitAll()
				)
		.logout((logout) -> logout
				.invalidateHttpSession(true)
				.clearAuthentication(true)
				.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
				.logoutSuccessUrl("/login?logout")
				.permitAll()
				)
		.exceptionHandling(excpt -> excpt
				.accessDeniedHandler(customAccessDeniedHandler)
				.accessDeniedPage("/403")
				);
		
		http.authenticationProvider(authenticationProvider());
		return http.build();
	}
	
//	@Bean
//	SecurityFilterChain filterChainAdmin(HttpSecurity http) throws Exception {
//		
//		http.authorizeHttpRequests((authorizeRequests) -> authorizeRequests.requestMatchers("/admin", "/403", "/css/**", "/images/**").permitAll().requestMatchers("/admin/login", "/admin/register", "/webjars/**").permitAll().anyRequest().authenticated())
//		.formLogin((formLogin) -> formLogin
//				.usernameParameter("adminusername")
//				.passwordParameter("adminpassword")
//				.loginPage("/admin/login")
//				.defaultSuccessUrl("/admin/home", true)
//				.failureUrl("/admin/login?error=true").permitAll()
//				)
//		.logout((logout) -> logout
//				.invalidateHttpSession(true)
//				.clearAuthentication(true)
//				.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//				.logoutSuccessUrl("/login?logout")
//				.permitAll()
//				)
//		.exceptionHandling(excpt -> excpt
//				.accessDeniedHandler(customAccessDeniedHandler)
//				.accessDeniedPage("/403")
//				);
//		
//		http.authenticationProvider(authenticationProvider());
//		return http.build();
//	}
}
