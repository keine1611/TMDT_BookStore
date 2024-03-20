package com.web.book.apicontroller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.web.book.dto.AuthUser;
import com.web.book.entity.User;
import com.web.book.repository.UserEntityRepository;
import com.web.book.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	 @Value("${upload.avatarFolder}")
	 private String avatarFolder;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthUser authUser) {
	    Optional<User> loginUser = userRepository.findByUsernameAndPassword(authUser.getUsername(), authUser.getPassword());
	    
	    
	    HttpHeaders headers = new HttpHeaders();
	    headers.add("Custom-Header", "header-value");

	    if (!loginUser.isPresent()) {
	        return new ResponseEntity<>("Sai tài khoản hoặc mật khẩu", headers, HttpStatus.UNAUTHORIZED);
	    }
	    else {
	        User user = loginUser.get();
	        return new ResponseEntity<>(user, headers, HttpStatus.OK);
	    }
	}
	
	@PostMapping("/signup")
	private ResponseEntity<?> signup(@RequestParam("username") String username, @RequestParam("password") String password,
			@RequestParam("fullname") String fullname,
			@RequestParam("email") String email, @RequestParam("phone") String phone , @RequestParam("address") String address,
			@RequestParam("avatar") MultipartFile avatarFile) throws IOException {
		User newUser = new User();
		if (userRepository.existsByUsername(username)){
			return ResponseEntity.badRequest().body("Username is already taken!");
		}

		if (userRepository.existsByEmail(email)) {
			return ResponseEntity.badRequest().body("Email is already in use!");
		}
		newUser.setAddress(address);
		newUser.setEmail(email);
		newUser.setUsername(username);
		newUser.setPassword(password);
		newUser.setPhone(phone);
		newUser.setRole("USER");
		newUser.setFullname(fullname);
		newUser.setAvatar("");
		userRepository.save(newUser);
		newUser.setAvatar("avatar"+newUser.getId()+".jpg");
		userRepository.save(newUser);
		try {
            Path avatarFolderPath = Paths.get(avatarFolder).toAbsolutePath().normalize();
            String newFilePath = avatarFolderPath.resolve(newUser.getAvatar()).toString();
            avatarFile.transferTo(new File(newFilePath));
        } 
		catch (IOException ex) {
			System.out.println("k them dc");
		}
		return  ResponseEntity.ok().body(newUser);
	}
}
