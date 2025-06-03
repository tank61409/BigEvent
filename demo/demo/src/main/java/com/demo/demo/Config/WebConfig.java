package com.demo.demo.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.demo.demo.Intercepter.LoginIntercepter;

@Configuration
public class WebConfig implements WebMvcConfigurer{
    @Autowired
    private LoginIntercepter loginIntercepter;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginIntercepter).excludePathPatterns("/user/login","/user/register");
    }


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("http://localhost:3000")
        .allowedMethods("GET","PUT","POST","PATCH","OPTIONS")
        .allowedHeaders("*")
        .exposedHeaders("*")
        .allowCredentials(true);
    }
}
