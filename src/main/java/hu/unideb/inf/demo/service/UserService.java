package hu.unideb.inf.demo.service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

import hu.unideb.inf.demo.dto.UserDto;
import hu.unideb.inf.demo.entity.Authority;
import hu.unideb.inf.demo.entity.BookStore;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.repository.AuthorityRepository;
import hu.unideb.inf.demo.repository.BookStoreRepository;
import hu.unideb.inf.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private AuthorityRepository authorityRepository;
    @Autowired
    private BookStoreRepository bookStoreRepository;

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User createWorkerUser(UserDto userDto) {
        User newUser = new User();

        BookStore bookStore = bookStoreRepository.getReferenceById(userDto.getBookstoreId());

        newUser.setId(userDto.getId());
        newUser.setBookStore(bookStore);
        newUser.setUsername(userDto.getUsername());
        newUser.setName(userDto.getName());
        newUser.setCohortStartDate(LocalDate.now());
        newUser.setEmail(userDto.getEmail());
        newUser.setPhoneNumber(userDto.getPhoneNumber());

        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        newUser.setPassword(encodedPassword);

        userRepository.save(newUser);

        Authority authority = new Authority();
        authority.setAuthority("ROLE_WORKER");
        authority.setUser(newUser);

        authorityRepository.save(authority);

        return newUser;
    }

    public void createCustomerUser(UserDto userDto) {
        User newUser = new User();

        newUser.setUsername(userDto.getUsername());
        newUser.setName(userDto.getName());

        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        newUser.setPassword(encodedPassword);

        userRepository.save(newUser);

        Authority authority = new Authority();
        authority.setAuthority("ROLE_CUSTOMER");
        authority.setUser(newUser);

        authorityRepository.save(authority);
    }

    public Set<User> getUsersByBookstoreId (Long bookstoreId) {
        Set<User> users = userRepository.findByBookStore(bookstoreId);

        return users;
    }

    public void delete(Long userId) {
        userRepository.deleteById(userId);
    }
}
