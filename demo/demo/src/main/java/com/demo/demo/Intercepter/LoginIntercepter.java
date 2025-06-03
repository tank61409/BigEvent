package com.demo.demo.Intercepter;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.demo.demo.helper.JWTHelper;
import com.demo.demo.helper.ThreadHelper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class LoginIntercepter implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String token = request.getHeader("Authorization");

        try {
            if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
                return true;
            }
            if(token == null ||!token.startsWith("Bearer ")){
                 response.setStatus(401);
                 return false;
            }
            token = token.substring(7);
            HashMap<String, Object> claims = new HashMap<>(JWTHelper.parseToken(token));
            ThreadHelper.set(claims);
            return true;
        } catch (Exception e) {
            response.setStatus(401);
            
            return false;
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        ThreadHelper.remove();
    }
}
