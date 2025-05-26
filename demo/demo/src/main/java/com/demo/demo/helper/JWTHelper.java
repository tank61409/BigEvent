package com.demo.demo.helper;

import java.util.Date;
import java.util.Map;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

public class JWTHelper {
    private static final String KEY = "Allen";
    public static String genToken(Map<String,Object> claims){
        return JWT.create().withClaim("claim", claims)
        .withExpiresAt(new Date(System.currentTimeMillis()+1000*60*60*24))
        .sign(Algorithm.HMAC256(KEY));
    }

    public static Map<String,Object> parseToken(String token){
        return JWT.require(Algorithm.HMAC256(KEY))
                .build()
                .verify(token)
                .getClaim("claim")
                .asMap();
    }

}
