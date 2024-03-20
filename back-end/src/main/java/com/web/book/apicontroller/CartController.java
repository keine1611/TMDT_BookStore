package com.web.book.apicontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.book.dto.BookDTO;
import com.web.book.dto.BookDTOReact;
import com.web.book.dto.CartAPIDTO;
import com.web.book.dto.CartDTO;
import com.web.book.entity.Book;
import com.web.book.entity.CartItem;
import com.web.book.entity.User;
import com.web.book.repository.BookRepository;
import com.web.book.repository.CartRepository;
import com.web.book.repository.UserRepository;

@RestController
@RequestMapping("/api/cart")
public class CartController {
	
	@Autowired
	CartRepository cartRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	BookRepository bookRepository;
	
	@PostMapping("/{id}")
	public ResponseEntity<?> updateCartForUser(@PathVariable("id") Long id_user, @RequestBody List<CartDTO> cartDTOs){
		User user = userRepository.findById(id_user).orElseThrow(); 
		List<CartItem> listcaCartItems = cartRepository.findByUserId(id_user);
		cartRepository.deleteAll(listcaCartItems);
		try {
			for(CartDTO cartDTO : cartDTOs ) {
				Book book = bookRepository.findById(cartDTO.getBook_id()).orElseThrow();
				CartItem cartItem = new CartItem();
				cartItem.setBook(book);
				cartItem.setCart_item_quantity(cartDTO.getCart_item_quantity());
				cartItem.setUser(user);
				cartRepository.save(cartItem);
			}
			ResponseEntity.ok("Cập nhật thành công");
			
		} catch (Exception e) {
			ResponseEntity.status(500).body("Lỗi cập nhật CartItem");
		}
		
		
		return ResponseEntity.ok(null);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getCartItemForUser(@PathVariable("id") Long id_user){
		try {
			List<CartItem> listcaCartItems = cartRepository.findByUserId(id_user);
			List<CartAPIDTO> listCartAPIDTOs = new ArrayList<>();
			for(CartItem cartItem : listcaCartItems) {
				CartAPIDTO cartAPIDTO = new CartAPIDTO();
				BookDTOReact bookDTOReact = bookRepository.getBookById(cartItem.getBook().getId()).orElseThrow();
				cartAPIDTO.setCart_item_quantity(cartItem.getCart_item_quantity());
				cartAPIDTO.setBook(bookDTOReact);
				listCartAPIDTOs.add(cartAPIDTO);
			}
			return ResponseEntity.ok(listCartAPIDTOs);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Lỗi");
		}
		
	}


}
