package com.demo.demo.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.demo.Mapper.AdminDao;
import com.demo.demo.Model.Ids;
import com.demo.demo.Model.Result;
import com.demo.demo.helper.DaoHelper;

@Service
public class AdminService {

    @Autowired
    private AdminDao adminDao;
    public Result fetchDate(Ids ids) {
        List<String> countList = new ArrayList<>();
        for (String tableName : ids.getIds()) {
            if(DaoHelper.isTableVaild(tableName)){
                countList.add(adminDao.getTableCount(tableName));
            }else{
                return Result.error("非法表名稱");
            }
            
        }
        

        return Result.success(countList);
    }

}
