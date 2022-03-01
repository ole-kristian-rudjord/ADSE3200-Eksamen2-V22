package com.example.esfileplaceholderspringboot1.Service;

import com.example.esfileplaceholderspringboot1.Model.Mouse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GlobalService {

    Logger errorLogger = LoggerFactory.getLogger(CompareShapesService.class);

    @Autowired
    JdbcTemplate db;

    public List<Mouse> getAllMice() {
        String sql = "SELECT * FROM mice";

        try {
            List<Mouse> mouseList = db.query(sql, new BeanPropertyRowMapper<>(Mouse.class));
            return mouseList;
        }
        catch (Exception e) {
            errorLogger.error("Error with getAllMice():\n" + e);
            return null;
        }
    }
}
