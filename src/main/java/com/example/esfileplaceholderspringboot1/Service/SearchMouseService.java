package com.example.esfileplaceholderspringboot1.Service;

import com.example.esfileplaceholderspringboot1.Model.SliderValuesMax;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchMouseService {

    Logger errorLogger = LoggerFactory.getLogger(CompareShapesService.class);

    final JdbcTemplate db;

    public SearchMouseService(JdbcTemplate db) {
        this.db = db;
    }

    public SliderValuesMax getSliderValues() {
        String sql = "SELECT MAX(length) AS length, MAX(width) AS width, MAX(height) AS height, MAX(weight) AS weight, MAX(maxDPI) AS maxDPI, MAX(pollingRate) AS pollingRate FROM mice";

        try {
            return (SliderValuesMax) db.queryForObject(sql, new BeanPropertyRowMapper<>(SliderValuesMax.class));
        }
        catch (Exception e) {
            errorLogger.error("Error with getSliderValues():\n" + e);
            return null;
        }
    }
}
