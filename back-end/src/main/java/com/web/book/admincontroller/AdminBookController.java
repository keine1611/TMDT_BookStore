package com.web.book.admincontroller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.web.book.dto.BookDTO;
import com.web.book.entity.Author;
import com.web.book.entity.Book;
import com.web.book.entity.Category;
import com.web.book.entity.Publisher;
import com.web.book.repository.AuthorRepository;
import com.web.book.repository.BookRepository;
import com.web.book.repository.CategoryRepository;
import com.web.book.repository.PublisherRepository;


@Controller
@RequestMapping("/admin")
public class AdminBookController {
	 @Value("${upload.bookFolder}")
	 private String bookFolder;
	
	@Autowired
	private BookRepository bookRepos;
	
	@Autowired
	private AuthorRepository authorRepos;
	
	@Autowired
	private CategoryRepository categoryRepos;
	
	@Autowired 
	private PublisherRepository publisherRepos;
	

	
	@GetMapping("/demo")
	public String demoTemplate() {
		return "/admin/demo";
	}
	
	@GetMapping("/book/list-books")
	public String listBook (Model model) {
		List<Book> listBooks = bookRepos.findAll();
		
		model.addAttribute("listbooks", listBooks);
		return "/admin/book/listbook";
	}
	
	@GetMapping("/book/editbook/{id}")
	public String editBook(@PathVariable("id") Long id, Model model) {
		Book book = bookRepos.findById(id).orElseThrow( () -> new IllegalArgumentException("Book not Found!"));
		List<Author> authors = authorRepos.findAll();
		List<Category> categories = categoryRepos.findAll();
		List<Publisher> publishers = publisherRepos.findAll();
		model.addAttribute("editbook",book);
		model.addAttribute("authors", authors);
		model.addAttribute("categories", categories);
		model.addAttribute("publishers", publishers);
		//System.out.println(bookDTO);
		return "admin/book/editbook";
	}
	
	@PostMapping("/book/editbook/{id}")
	public String saveEditBook(@PathVariable("id") Long id, @RequestParam("book_name") String book_name,
			@RequestParam("book_description") String book_des, @RequestParam("book_price") Integer book_price, 
			@RequestParam("book_quantity") int book_quantity , Model model)  {
		Book editBook = bookRepos.findById(id).orElseThrow(() -> new IllegalArgumentException("Book Not Found!"));
		editBook.setBook_name(book_name);
		editBook.setBook_description(book_des);
		editBook.setBook_price(book_price);
		editBook.setBook_quantity(book_quantity);
		bookRepos.save(editBook);
		model.addAttribute("editbook",editBook);
		return "/admin/book/editbook";
	}
	
	@GetMapping("/book/add-book")
	public String addBookForm(Model model) {
		List<Author> authors = authorRepos.findAll();
		List<Category> categories = categoryRepos.findAll();
		List<Publisher> publishers = publisherRepos.findAll();
		model.addAttribute("authors", authors);
		model.addAttribute("categories", categories);
		model.addAttribute("publishers", publishers);
		return "/admin/book/addbook";
	}
	
	@PostMapping("/book/add-book")
	public String addBook(@RequestParam("book_name") String bname, @RequestParam("book_description") String book_des,
			@RequestParam("book_price") Integer book_price, @RequestParam("book_quantity") Integer book_quantity, @RequestParam("book_lang") String lang,
			@RequestParam("selectAuthor") Long author_id, @RequestParam("selectCategory") Long cate_id,
			@RequestParam("selectPublisher") Long pub_id, @RequestParam("book_image") MultipartFile book_image, Model model) throws IOException {
		Book addBook = new Book();
		Author addAuthor = authorRepos.findById(author_id).orElseThrow(() -> new IllegalArgumentException("Author Not Found!"));;
		Category addCategory = categoryRepos.findById(cate_id).orElseThrow(() -> new IllegalArgumentException("Category Not Found!"));
		Publisher addPublisher = publisherRepos.findById(pub_id).orElseThrow(() -> new IllegalArgumentException("Publisher Not Found!"));
		addBook.setBook_description(book_des);
		addBook.setBook_name(bname);
		addBook.setBook_price(book_price);
		addBook.setBook_quantity(book_quantity);
		addBook.setBook_lang(lang);
		addBook.setAuthor(addAuthor);
		addBook.setCategory(addCategory);
		addBook.setPublisher(addPublisher);
		addBook.setBook_image("");
		bookRepos.save(addBook);
		addBook.setBook_image("book"+addBook.getId()+".jpg");
		bookRepos.save(addBook);
		try {
            Path bookFolderPath = Paths.get(bookFolder).toAbsolutePath().normalize();
            String newFilePath = bookFolderPath.resolve(addBook.getBook_image()).toString();
            book_image.transferTo(new File(newFilePath));
        } 
		catch (IOException ex) {
			System.out.println("k them dc");
		}
		
		List<Book> listBooks = bookRepos.findAll();
		model.addAttribute("listbooks", listBooks);
		return "redirect:/admin/book/list-books";
	}
	
	
    @DeleteMapping("/book/delete/{id}")
    public String deleteBook(@PathVariable("id") Long book_id) {
        Book deleteBook = bookRepos.findById(book_id).orElseThrow(() -> new IllegalArgumentException("Author Not Found"));
        bookRepos.delete(deleteBook);
        return "redirect:/admin/book/list-books";
    }
	
	
	
	
	
	
	
	
}
