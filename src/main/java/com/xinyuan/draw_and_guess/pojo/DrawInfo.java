package com.xinyuan.draw_and_guess.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DrawInfo {
    private int x;
    private int y;
    private String type;
    private int color;
}
