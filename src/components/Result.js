import axios from "axios";
import {useParams} from "react-router-dom";
import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
// import StartPage from "./components/StartPage";
// import Example from "./components/Example";
import React, { Component } from "react";
import {NameContext, GenderContext} from "../App"


// report 
// https://inspct.career.go.kr/inspct/api/psycho/report?seq=seq값
// majors
// https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=5&no2=4
// jobs
// https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=5&no2=4


function Result () {
    const params = useParams();
    const seq = params.seq;
    const [testDate, setTestDate] = useState("");
    const apiResultUrl = "https://inspct.career.go.kr/inspct/api/psycho/report?seq=" + seq

    const getResult = useCallback(async () => {
       const res = await axios.get(apiResultUrl)
       const testBeginDtm = res.data.inspct.beginDtm;
     
       setTestDate(testBeginDtm.split("T")[0])


    }, [apiResultUrl]);
    useEffect(() => {
        getResult();
      }, [getResult]);
    
    
    const report = axios.get("https://inspct.career.go.kr/inspct/api/psycho/report?seq=" + seq)
    console.log(report)
    const majors = axios.get("https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=5&no2=4" + seq)
    console.log(majors)
    const jobs = axios.get("https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=5&no2=4" + seq)
    console.log(jobs)

    return (
        <div>
            <h1>직업가치관검사 결과표</h1>
            <h1>{testDate}</h1>
            <h3>{seq}</h3>
        </div>
    )
}

export default Result;