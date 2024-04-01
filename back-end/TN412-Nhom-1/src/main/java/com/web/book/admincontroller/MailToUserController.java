package com.web.book.admincontroller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.web.book.entity.User;
import com.web.book.repository.UserRepository;
import com.web.book.service.MailService;

import jakarta.mail.MessagingException;

@Controller
@RequestMapping("/admin")
public class MailToUserController {
	
	@Autowired
	MailService mailService;
	
	@Autowired
	private UserRepository userRepository;

	@GetMapping("/mail")
	public String getForm(Model model) {
		return "admin/mail";
	}

	@PostMapping("/mailToUser")
	public String mailToUser( 
			@RequestParam String subject,
			@RequestParam String message) throws MessagingException, IOException {
		List<User> users = userRepository.findAll();
		for (User user : users) {
			String email = user.getEmail();		
			mailService.sendMail(email, subject, message);
		}
		return "redirect:/admin/account";
	}

}
