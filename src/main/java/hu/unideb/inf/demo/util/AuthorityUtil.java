package hu.unideb.inf.demo.util;

import hu.unideb.inf.demo.entity.User;

public class AuthorityUtil {

    public static Boolean hasRole(String role, User user) {
        return user.getAuthorities()
                .stream()
                .filter(auth->auth.getAuthority().equals(role))
                .count() >0;
    }

}
