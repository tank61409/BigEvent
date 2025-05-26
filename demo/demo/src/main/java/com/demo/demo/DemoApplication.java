package com.demo.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.demo.demo")
@SpringBootApplication
public class DemoApplication {
	//測試測試測試
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
