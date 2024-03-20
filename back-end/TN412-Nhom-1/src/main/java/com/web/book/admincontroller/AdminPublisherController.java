package com.web.book.admincontroller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.web.book.entity.Book;
import com.web.book.entity.Publisher;
import com.web.book.repository.BookRepository;
import com.web.book.repository.PublisherRepository;


@Controller
@RequestMapping("/admin")
public class AdminPublisherController {
	
	@Autowired
	private PublisherRepository publisherRepos;
	
	@Autowired
	private BookRepository bookRepos;
	
	//publisher
	
	@GetMapping("/publisher/list-publishers")
	public String listPublisher(Model model) {
		List<Publisher> listpublishers = publisherRepos.findAll();
		model.addAttribute("publishers",listpublishers);
		return "/admin/publisher/listpublishers";
	}
	
//	@GetMapping("/publisher/addpublisher")
//	public String addPublisher(Model model) {
//		Publisher publisher = new Publisher();
//	    model.addAttribute("publisher", publisher);
//	    return "/admin/publisher/addpublisher";
//	}
	
	@PostMapping("/publisher/add")
	public String addPublisher(@RequestBody Publisher publisher, BindingResult bindingResult) {
		publisherRepos.save(publisher);
	    return "redirect:/admin/publisher/list-publishers";
	}
	
//	@GetMapping("/publisher/edit/{id}")
//	public String editPublisher(@PathVariable("id") Long id, Model model) {
//		Publisher publisher = publisherRepos.findById(id).orElseThrow(() -> new IllegalArgumentException("Publisher not found!"));
//	    model.addAttribute("editpublisher", publisher);
//	    return "redirect:/admin/publisher/listpublisher";
//	}
	
	@PostMapping("/publisher/edit/{id}")
	public String saveEditPublisher(@PathVariable("id") Long id, @RequestParam("publisher_name") String publisherName, @RequestParam("publisher_description") String publisherDescription, Model model) {
	    Publisher editPublisher = publisherRepos.findById(id).orElseThrow(() -> new IllegalArgumentException("Publisher not found!"));
	    editPublisher.setPublisher_name(publisherName);
	    editPublisher.setPublisher_description(publisherDescription);
	    publisherRepos.save(editPublisher);
	    return "redirect:/admin/publisher/list-publishers";
	}
	
	@PostMapping("/publisher/delete/{id}")
	public String deletePublisher(@PathVariable("id") Long id) {
		// Xóa tất cả các sách thuộc danh mục
	    List<Book> books = bookRepos.findByPublisherId(id);
	    bookRepos.deleteAll(books);
	    // Xóa danh mục
	    publisherRepos.deleteById(id);

	    return "redirect:/admin/publisher/list-publishers";
	}
}
