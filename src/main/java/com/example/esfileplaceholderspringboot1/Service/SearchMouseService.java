package com.example.esfileplaceholderspringboot1.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class SearchMouseService {

    @Autowired
    JdbcTemplate db;


}
