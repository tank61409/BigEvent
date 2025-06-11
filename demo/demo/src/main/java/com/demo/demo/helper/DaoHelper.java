package com.demo.demo.helper;

import java.util.Set;

public class DaoHelper {
    private static final Set<String> AllowedTables = Set.of("user","category","article");
    public static boolean isTableVaild(String tableName){
        if(AllowedTables.contains(tableName)){
            return true;
        }else{
            return false;
        }
    }
}
