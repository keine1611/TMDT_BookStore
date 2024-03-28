package com.web.book.admincontroller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
//import org.springframework.mail
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.web.book.entity.User;
import com.web.book.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Controller
@RequestMapping("/admin")
public class MailToUserController {

	@Value("${spring.mail.username}")
	private String fromMail;

	@Autowired
	private JavaMailSender mailSender;

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
			sendMail(email, subject, message);
			System.out.println("send to : " + email);
		}
		System.out.println("send from " + fromMail);
		return "redirect:/admin/account";
	}

	public void sendMail(String mail, String subject, String message) throws MessagingException, IOException {
		MimeMessage mineMessage = mailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mineMessage, true);
		mimeMessageHelper.setFrom(fromMail);
		mimeMessageHelper.setTo(mail);

		mimeMessageHelper.setSubject(subject);
		mimeMessageHelper.setText("<p> hello </p>", true);
//		mimeMessageHelper.set
////		for(MultipartFile file : files) {
//			mimeMessageHelper.addAttachment(file.getOriginalFilename(), file.getResource());
//		}
		mailSender.send(mineMessage);
	}
}
