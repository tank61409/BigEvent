package com.demo.demo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Result<T> {
    private int code;
    private String message;
    private T data;

    public static<E> Result<E> success(E data){
        return new Result<>(1,"交易成功",data);
    }

    public static Result success(){
         return new Result<>(1,"交易成功",null);
    }

    public static Result error(String msg){
         return new Result<>(0,msg,null);
    }
}
