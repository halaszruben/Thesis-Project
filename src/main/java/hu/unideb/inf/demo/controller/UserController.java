package hu.unideb.inf.demo.controller;

import java.util.Set;

import hu.unideb.inf.demo.dto.UserDto;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.service.UserService;
import hu.unideb.inf.demo.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("register/worker")
    private ResponseEntity<User> createWorkerUser(@RequestBody UserDto userDto) {
        User user = userService.createWorkerUser(userDto);

        return ResponseEntity.ok(user);
    }

    @PostMapping("register/customer")
    private ResponseEntity<?> createCustomerUser(@RequestBody UserDto userDto) {

        userService.createCustomerUser(userDto);

        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    userDto.getUsername(), userDto.getPassword()
                            )
                    );

            User user = (User) authenticate.getPrincipal();

            user.setPassword(null);

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtUtil.generateToken(user)
                    )
                    //Not so great, because it leaves the password open
                    .body(user);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("")
    public ResponseEntity<Set<User>> getUsersByBookstore(@RequestParam Long bookstoreId) {
        Set<User> users = userService.getUsersByBookstoreId(bookstoreId);

        return ResponseEntity.ok(users);
    }

    @DeleteMapping("{userId}")
    public ResponseEntity<?> deleteWorkerUser(@PathVariable Long userId) {
        try {
            userService.delete(userId);
            return ResponseEntity.ok("The user has been deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
