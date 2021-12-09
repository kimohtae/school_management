package com.greenart.school_management.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.greenart.school_management.mapper.DashboardMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {
    @Autowired DashboardMapper mapper;

    public Map<String, Object> getCounts(){
        List<Integer> deptCntList = new ArrayList<Integer>();
        deptCntList.add(mapper.getTotalDepartmentCnt());
        deptCntList.add(mapper.getActiveDepartmentCnt());
        deptCntList.add(mapper.getDeactiveDepartmentCnt());
        
        List<Integer> teachertCntList = new ArrayList<Integer>();
        teachertCntList.add(mapper.getTotalTeacherCnt());
        teachertCntList.add(mapper.getWorkTeacherCnt());
        teachertCntList.add(mapper.getDayOffTeacherCnt());
        
        List<Integer> studnetCntList = new ArrayList<Integer>();
        studnetCntList.add(mapper.getTotalStudentCnt());
        studnetCntList.add(mapper.getAttendStudentCnt());
        studnetCntList.add(mapper.getDayOffStudentCnt());
        studnetCntList.add(mapper.getLeaveStudentCnt());
        
        List<Integer> subjecttCntList = new ArrayList<Integer>();
        subjecttCntList.add(mapper.getTotalSubjectCnt());
        subjecttCntList.add(mapper.getActiveSubjectCnt());
        subjecttCntList.add(mapper.getDeactiveSubjectCnt());
        subjecttCntList.add(mapper.getFinishSubjectCnt());
        
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        resultMap.put("department",deptCntList);
        resultMap.put("teacher",teachertCntList);
        resultMap.put("student",studnetCntList);
        resultMap.put("subject",subjecttCntList);

        return resultMap;
    }
}
