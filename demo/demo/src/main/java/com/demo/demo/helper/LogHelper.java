package com.demo.demo.helper;

import org.springframework.beans.factory.annotation.Autowired;

import com.demo.demo.Mapper.LogDao;
import com.demo.demo.Model.Log;

public class LogHelper {
    @Autowired
    static LogDao logDao;

    public static void insertLog(Log log) {
        logDao.insertLog(log);
    }
}
