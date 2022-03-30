package com.example.esfileplaceholderspringboot1.Global.Service;

import com.example.esfileplaceholderspringboot1.Global.Model.Mouse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GlobalService {

    Logger errorLogger = LoggerFactory.getLogger(GlobalService.class);

    final JdbcTemplate db;

    public GlobalService(JdbcTemplate db) {
        this.db = db;
    }

    public List<Mouse> getAllMice() {
        String sql = "SELECT * FROM mice/* ORDER BY brand ASC*/";

        try {
            List<Mouse> mouseList = db.query(sql, new BeanPropertyRowMapper<>(Mouse.class));
            return mouseList;
        }
        catch (Exception e) {
            errorLogger.error("Error with getAllMice():\n" + e);
            return null;
        }
    }

    public List<Mouse> getDistinctBrands() {
        String sql = "SELECT DISTINCT(brand) FROM mice";

        try {
            return db.query(sql, new BeanPropertyRowMapper<>(Mouse.class));
        }
        catch (Exception e) {
            errorLogger.error("Error with getDistinctBrand():\n" + e);
            return null;
        }
    }

    public List<Mouse> getDistinctCategoryItems(String category) {
        String sql = "SELECT DISTINCT(" + category + ") FROM mice";

        try {
            return db.query(sql, new BeanPropertyRowMapper<>(Mouse.class));
        }
        catch (Exception e) {
            errorLogger.error("Error with getDistinctCategoryItems():\n" + e);
            return null;
        }
    }
}
