package com.example.esfileplaceholderspringboot1.Service;

import com.example.esfileplaceholderspringboot1.Model.SliderValues;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.util.List;

@Service
public class SearchMouseService {

    @Autowired
    JdbcTemplate db;

    public List<SliderValues> getSliderValues() {
        String sql = "SELECT MAX(length), MAX(width), MAX(height), MAX(weight), MAX(maxDPI), MAX(pollingRate) FROM mice";

        return db.query(sql, new BeanPropertyRowMapper<>(SliderValues.class));
    }
}
