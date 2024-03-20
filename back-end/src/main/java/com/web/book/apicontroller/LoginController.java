package com.web.book.apicontroller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.web.book.repository.UserEntityRepository;


@Controller
public class LoginController {
	
	@Autowired
	private UserEntityRepository userEntityRepos;

	@GetMapping("/login")
	public String formLogin() {
		return "/user/login";
	}

}
