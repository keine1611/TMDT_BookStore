package com.web.book.entity;


import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Proxy;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Integer book_cost;
	
	private Integer ship_cost;
	
	private Integer subtotal;
	
	private String status;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	
	private User user;
	@OneToMany(cascade = CascadeType.ALL, 
			mappedBy = "order", orphanRemoval = true, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<OrderDetail> orderDetails = new ArrayList<>();
	
	public Order() {
		super();
	}

	public Order(Long id, int book_cost, int ship_cost, int subtotal, String status, User user,
			List<OrderDetail> orderDetails) {
		super();
		this.id = id;
		this.book_cost = book_cost;
		this.ship_cost = ship_cost;
		this.subtotal = subtotal;
		this.status = status;
		this.user = user;
		this.orderDetails = orderDetails;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getBook_cost() {
		return book_cost;
	}

	public void setBook_cost(Integer book_cost) {
		this.book_cost = book_cost;
	}

	public Integer getShip_cost() {
		return ship_cost;
	}

	public void setShip_cost(Integer ship_cost) {
		this.ship_cost = ship_cost;
	}

	public Integer getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(Integer subtotal) {
		this.subtotal = subtotal;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<OrderDetail> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetail> orderDetails) {
		this.orderDetails = orderDetails;
	}
}
