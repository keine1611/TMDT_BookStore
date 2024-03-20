package com.web.book;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.InitBinder;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.book.dto.BookInitDTO;
import com.web.book.entity.Author;
import com.web.book.entity.Book;
import com.web.book.entity.Category;
import com.web.book.entity.Publisher;
import com.web.book.entity.User;
import com.web.book.repository.AuthorRepository;
import com.web.book.repository.BookRepository;
import com.web.book.repository.CategoryRepository;
import com.web.book.repository.PublisherRepository;
import com.web.book.repository.UserRepository;
import com.web.book.service.DBService;

@SpringBootApplication
public class Tn412Nhom1Application {
	
	public static void main(String[] args) {
		SpringApplication.run(Tn412Nhom1Application.class, args);
	}
	
	 @Bean
	    CommandLineRunner runner(AuthorRepository authorRepository, CategoryRepository categoryRepository, 
	    		PublisherRepository publisherRepository, BookRepository bookRepository, UserRepository userRepository) {
	        return args -> {
	            ObjectMapper mapper = new ObjectMapper();
	            //Init Author
	            TypeReference<List<Author>> authoReference = new TypeReference<List<Author>>(){};
	            InputStream inputStream = TypeReference.class.getResourceAsStream("/json/author.json");
	            try {
	                List<Author> listAuthors = mapper.readValue(inputStream,authoReference);
	                for(Author author: listAuthors) {
	                	authorRepository.save(author);
	                }
	                System.out.println("Author Saved!");
	            } catch (IOException e){
	                System.out.println("Unable to save Authors: " + e.getMessage());
	            }
	            //Init Category
	            TypeReference<List<Category>> categoryReference = new TypeReference<List<Category>>(){};
	            InputStream inputStreamCategory = TypeReference.class.getResourceAsStream("/json/category.json");
	            try {
	                List<Category> listCategory = mapper.readValue(inputStreamCategory,categoryReference);
	                for(Category category: listCategory) {
	                	categoryRepository.save(category);
	                }
	                System.out.println("Categories Saved!");
	            } catch (IOException e){
	                System.out.println("Unable to save categories: " + e.getMessage());
	            }
	            //Init Publisher
	            TypeReference<List<Publisher>> publisherReference = new TypeReference<List<Publisher>>(){};
	            InputStream inputStreamPublisher= TypeReference.class.getResourceAsStream("/json/publisher.json");
	            try {
	                List<Publisher> listPublishers = mapper.readValue(inputStreamPublisher,publisherReference);
	                for(Publisher publisher: listPublishers) {
	                	publisherRepository.save(publisher);
	                }
	                System.out.println("Publishers Saved!");
	            } catch (IOException e){
	                System.out.println("Unable to save Publishers: " + e.getMessage());
	            }
	            
	            //Init Publisher
	            TypeReference<List<BookInitDTO>> bookReference = new TypeReference<List<BookInitDTO>>(){};
	            InputStream inputStreamBook= TypeReference.class.getResourceAsStream("/json/book.json");
	            try {
	                List<BookInitDTO> listBookInitDTOs = mapper.readValue(inputStreamBook,bookReference);
	                for(BookInitDTO bookInitDTO: listBookInitDTOs) {
	                	Author author = authorRepository.findById(bookInitDTO.getAuthor_id()).orElseThrow();
	    				Category category = categoryRepository.findById(bookInitDTO.getCategory_id()).orElseThrow();
	    				Publisher publisher = publisherRepository.findById(bookInitDTO.getPublisher_id()).orElseThrow();
	    				Book book = new Book();
	    				book.setBook_name(bookInitDTO.getBook_name());
	    				book.setBook_price(bookInitDTO.getBook_price());
	    				book.setBook_quantity(bookInitDTO.getBook_quantity());
	    				book.setBook_description(bookInitDTO.getBook_description());
	    				book.setBook_lang(bookInitDTO.getBook_lang());
	    				book.setBook_image(bookInitDTO.getBook_image());
	    				book.setAuthor(author);
	    				book.setCategory(category);
	    				book.setPublisher(publisher);
	    				bookRepository.save(book);
	                }
	                System.out.println("Books Saved!");
	            } catch (IOException e){
	                System.out.println("Unable to save Books: " + e.getMessage());
	            }
	            
	            User userAccount = new User();
	            userAccount.setAddress("TP HCM");
	            userAccount.setAvatar("avatar1.jpg");
	            userAccount.setEmail("user@gmail.com");
	            userAccount.setFullname("Toi la User");
	            userAccount.setPassword("1234");
	            userAccount.setPhone("0836420652");
	            userAccount.setRole("USER");
	            userAccount.setUsername("user");
	            userRepository.save(userAccount);
	            
	            User adminAccount = new User();
	            adminAccount.setAddress("TP HCM");
	            adminAccount.setAvatar("avatar2.jpg");
	            adminAccount.setEmail("admin@gmail.com");
	            adminAccount.setFullname("Toi la Admin");
	            adminAccount.setPassword("$2a$10$DdyBQpt4y.0tLO0l0MSwGumyo9qSWj07gmSbLMf8xfHtyJSqwVHYi");
	            adminAccount.setPhone("0836420652");
	            adminAccount.setRole("Admin");
	            adminAccount.setUsername("admin");
	            userRepository.save(adminAccount);
	            
	        };
	    }

}
