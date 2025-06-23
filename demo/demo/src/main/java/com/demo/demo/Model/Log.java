package com.demo.demo.Model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Log {
    private String userId;
    private String actionType;
    private String targetType;
    private String desceiption;
    private LocalDateTime actionTime;
}
