package com.enterprise.app.controller;

import com.enterprise.app.security.JwtTokenUtil;
import com.enterprise.app.service.CustomUserDetailsService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody AuthRequest authRequest) throws Exception {
        // ✅ Allow both "email" and "username" for compatibility
        String loginKey = (authRequest.getEmail() != null && !authRequest.getEmail().isEmpty())
                ? authRequest.getEmail()
                : authRequest.getUsername();

        String password = authRequest.getPassword();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginKey, password)
            );
        } catch (BadCredentialsException ex) {
            throw new AuthenticationException("Incorrect username or password") {};
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginKey);
        final String token = jwtTokenUtil.generateToken(userDetails);

        var roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("roles", roles);
        response.put("username", loginKey);

        return response;
    }
}

// ✅ Updated AuthRequest model
class AuthRequest {
    private String email;
    private String username;
    private String password;

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}

