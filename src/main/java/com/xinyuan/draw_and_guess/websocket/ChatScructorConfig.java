package com.xinyuan.draw_and_guess.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class ChatScructorConfig {

    @Bean
    public Map<Integer, ChatEndPoint> getMap(){
        return new ConcurrentHashMap<>();
    }

    @Bean
    public Set<String> getSet(){
        return new HashSet<>();
    }

}
