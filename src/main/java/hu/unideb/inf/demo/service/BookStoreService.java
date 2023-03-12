package hu.unideb.inf.demo.service;

import java.util.Optional;
import java.util.Set;

import hu.unideb.inf.demo.entity.BookStore;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.enums.AuthorityEnum;
import hu.unideb.inf.demo.repository.BookStoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookStoreService {

    @Autowired
    private BookStoreRepository bookStoreRepository;

    public BookStore save(User user) {
        BookStore bookStore = new BookStore();
        bookStore.setUser(user);

        return bookStoreRepository.save(bookStore);
    }

    public Set<BookStore> findByUser(User user) {
        boolean hasCustomerRole = user.getAuthorities()
                .stream()
                .filter(auth -> AuthorityEnum.ROLE_CUSTOMER.name().equals(auth.getAuthority()))
                .count() > 0;

        if (hasCustomerRole) {
            return bookStoreRepository.findAll(user);
        } else {
            return bookStoreRepository.findByUser(user);
        }
    }

    public Optional<BookStore> findById(Long bookstoreId) {
        return bookStoreRepository.findById(bookstoreId);
    }

    public BookStore save(BookStore bookStore) {
        return bookStoreRepository.save(bookStore);
    }
}
