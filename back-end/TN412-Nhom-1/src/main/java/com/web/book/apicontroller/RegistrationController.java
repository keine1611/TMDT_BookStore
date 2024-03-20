package com.web.book.apicontroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RegistrationController {
	
	@GetMapping("/register")
	public String formResgister() {
		return "user/register";
	}
}
