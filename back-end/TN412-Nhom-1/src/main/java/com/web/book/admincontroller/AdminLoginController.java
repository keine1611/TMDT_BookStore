package com.web.book.admincontroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminLoginController {
	@GetMapping("/admin")
	public String formLogin_admin() {
		return "/admin/adminlogin";
	}
	@GetMapping("/admin/login")
	public String formLogin() {
		return "/admin/adminlogin";
	}
}
