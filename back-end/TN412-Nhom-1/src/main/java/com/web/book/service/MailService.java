package com.web.book.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.web.book.entity.Book;
import com.web.book.entity.User;
import com.web.book.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {


	@Value("${spring.mail.username}")
	private String fromMail;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	private JavaMailSender mailSender;
	
	public void sendMail(String mail, String subject, String message) throws MessagingException, IOException {
		MimeMessage mineMessage = mailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mineMessage, true);
		mimeMessageHelper.setFrom(fromMail);
		mimeMessageHelper.setTo(mail);

		mimeMessageHelper.setSubject(subject);
		mimeMessageHelper.setText(message, true);

		mailSender.send(mineMessage);
	}
	public void sendEmailAds(List<Book> books) throws MessagingException, IOException {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(fromMail);
		message.setTo("khanghoang1611@gmail.com");
		message.setSubject("Danh sách sản phẩm quảng bá");

		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("<html><body>");
		stringBuilder.append("<h2>Cùng tôi đọc sách mỗi ngày bạn nhé!</h2>");
		stringBuilder.append("<table>");

		for (Book book : books) {
			stringBuilder.append("<tr> <td>" + book.getBook_name() + "<td> <td>" +book.getBook_price() +  " vnd </td></tr>");
		}
	
		stringBuilder.append("</table>");
		stringBuilder.append("<p>Hãy ghé thăm cửa hàng của chúng tôi nhé! </p>");
		stringBuilder.append("<img src=\"https://i.imgur.com/vIuqsai.png\" style=\"width: 100px; \"/>");
		stringBuilder.append("</body></html>");

		message.setText(stringBuilder.toString());
		//message.setContent(stringBuilder.toString(), "text/html");
		List<User> users = userRepository.findAll();
		for (User user : users) {
			sendMail(user.getEmail(), "Đọc sách cùng nhau nào",
					stringBuilder.toString());
		}
	}
}
