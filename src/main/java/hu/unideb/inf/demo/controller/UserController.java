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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    private void createWorkerUser(@RequestBody UserDto userDto) {

        userService.createWorkerUser(userDto);

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
    public ResponseEntity<?> getUsers(@AuthenticationPrincipal User user) {
        Set<User> users = userService.findByUsername(user);
        
        return ResponseEntity.ok(users);
    }

}
