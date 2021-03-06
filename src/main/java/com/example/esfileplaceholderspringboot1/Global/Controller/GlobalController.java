package com.example.esfileplaceholderspringboot1.Global.Controller;

import com.example.esfileplaceholderspringboot1.Global.Model.Mouse;
import com.example.esfileplaceholderspringboot1.Global.Service.GlobalService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/Global")
public class GlobalController {

    final GlobalService GlobalService;

    public GlobalController(GlobalService GlobalService) {
        this.GlobalService = GlobalService;
    }

    @GetMapping("/getAllMice")
    public List<Mouse> getAllmice(HttpServletResponse response) throws IOException {
        List<Mouse> mouseList = GlobalService.getAllMice();
        if (mouseList == null) {
            response.sendError(HttpStatus.NOT_FOUND.value());
        }
        return mouseList;
    }
}
