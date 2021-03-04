import axios from "axios";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
// import StartPage from "./components/StartPage";
// import Example from "./components/Example";
import React, { Component } from "react";
import { NameContext, GenderContext } from "../App";
// import { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


function JobsResult(props) {
  console.log(props.jobsGroup)
  console.log(props.jobsData)


  return (
    <>
    <h3>{props.jobsGroup}</h3>
    <h3>{props.jobsData}</h3>
    </>
  );
}

function MajorsResult(props) {


  return (
    <>
    <h3>{props.majorsGroup}</h3>
    <h3>{props.majorsData}</h3>
    </>

  );
}



function Result() {
  const { name, setName } = useContext(NameContext);
  const { gender, setGender } = useContext(GenderContext);
  const params = useParams();
  const [wonScore, setWonScore] = useState([]);
  const seq = params.seq;
  const [testDate, setTestDate] = useState("");
  const [apiUrlNo1, setApiUrlNo1] = useState("");
  const [apiUrlNo2, setApiUrlNo2] = useState("");
  const [jobsData, setJobsData] = useState([])
  const [majorsData, setMajorsData] = useState([])
  const apiReportUrl =
    `https://inspct.career.go.kr/inspct/api/psycho/report?seq=` + seq;
  const apiMajorsUrl = useMemo(() => {
    return `https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${apiUrlNo1}&no2=${apiUrlNo2}`;
  }, [apiUrlNo1, apiUrlNo2]);

  const apiJobsUrl = useMemo(() => {
    return `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${apiUrlNo1}&no2=${apiUrlNo2}`;
  }, [apiUrlNo1, apiUrlNo2]);

  const jobsClassName = ['중졸이하','고졸','전문대졸','대졸','대학원졸'];
  const majorsClassName = ['계열무관','인문','사회','교육','공학','자연','의학','예체능'];

  const getReportResult = useCallback(async () => {
    const reportRes = await axios.get(apiReportUrl);
    const testBeginDtm = reportRes.data.inspct.beginDtm;
    setTestDate(testBeginDtm.split("T")[0]);

    const resWonScore = reportRes.data.result.wonScore.split(" ");
    console.log(resWonScore)
    resWonScore.pop();
    console.log(resWonScore)


    setWonScore((current) => {
        for (var i = 0; i < resWonScore.length; i++) {
            const variable = resWonScore[i].split("=")[1]
          current.push(variable);
        }
        return current
        // const newWonScoreArr = [...wonScoreArr]
        // return newWonScoreArr
    })

    // setWonScore(wonScoreArr);
    console.log(wonScore);

    const sortedWonScore = [...wonScore];
    sortedWonScore.sort(function (a, b) {
      return b - a;
    });
    console.log(sortedWonScore);

    const sortedWonScore1stMax = sortedWonScore[0];
    console.log(sortedWonScore1stMax);
    // console.log(typeof(sortedWonScore1stMax));
    const sortedWonScore2ndMax = sortedWonScore[1];
    console.log(sortedWonScore2ndMax);

    if (sortedWonScore1stMax === sortedWonScore2ndMax) {
      const sortedWonScore1stMaxIdx =
        wonScore.indexOf(sortedWonScore1stMax) + 1;
        console.log(sortedWonScore1stMaxIdx)
      const sortedWonScore2ndMaxIdx =
        wonScore.lastIndexOf(sortedWonScore2ndMax) + 1;
        console.log(sortedWonScore2ndMaxIdx)

      return(setApiUrlNo1(sortedWonScore1stMaxIdx), setApiUrlNo2(sortedWonScore2ndMaxIdx))
    } else {
      const sortedWonScore1stMaxIdx =
        wonScore.indexOf(sortedWonScore1stMax) + 1;
        console.log(sortedWonScore1stMaxIdx)

      const sortedWonScore2ndMaxIdx =
        wonScore.indexOf(sortedWonScore2ndMax) + 1;
        console.log(sortedWonScore2ndMaxIdx)

        return(setApiUrlNo1(sortedWonScore1stMaxIdx), setApiUrlNo2(sortedWonScore2ndMaxIdx))
        console.log(apiUrlNo1)
      console.log(apiUrlNo2)
      }
  }, [apiReportUrl]);
//   console.log(apiUrlNo1)
//   console.log(apiUrlNo2)
//   console.log(apiMajorsUrl)

  const getMajorsResult = useCallback(async () => {
    const majorsRes = await axios.get(apiMajorsUrl);
    setMajorsData(majorsRes.data)
    // console.log(majorsRes);
  }, [apiMajorsUrl]);

  const getJobsResult = useCallback(async () => {
    const jobsRes = await axios.get(apiJobsUrl);
    setJobsData(jobsRes.data)
    // console.log(jobsRes);
  }, [apiJobsUrl]);


  useEffect(() => {
    getReportResult();
  }, [getReportResult]);

  useEffect(() => {
    getMajorsResult();
  }, [getMajorsResult]);

  useEffect(() => {
    getJobsResult();
  }, [getJobsResult]);

  const chartData = useMemo(() => {
      return ( [
        {
          name: "능력발휘",
          score: wonScore[0],
        },
        {
          name: "자율성",
          score: wonScore[1],
        },
        {
          name: "보수",
          score: wonScore[2],
        },
        {
          name: "안정성",
          score: wonScore[3],
        },
        {
          name: "사회적 인정",
          score: wonScore[4],
        },
        {
          name: "사회봉사",
          score: wonScore[5],
        },
        {
          name: "자기계발",
          score: wonScore[6],
        },
        {
          name: "창의성",
          score: wonScore[7],
        },
      ])
   
  }, [apiUrlNo1, apiUrlNo2]);

  return (
    <div>
      <h1>직업가치관검사 결과표</h1>
      <h4>
        직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과
        신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의
        역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때
        상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이
        가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼
        기회를 제공합니다.
      </h4>
      <h3>검사일: {testDate}</h3>
      <h3>이름: {name}</h3>
      {gender === "100324" ? <h3>성별: 여성</h3> : <h3>성별: 남성</h3>}
      <h4>{apiUrlNo1}</h4>
      <h4>{apiUrlNo2}</h4>

      <h2>직업가치관결과</h2>
      <BarChart
        width={1000}
        height={400}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="score" fill="#8884d8" />
      </BarChart>


        <JobsResult jobsGroup={jobsClassName} jobsData={jobsData}/>
        <MajorsResult majorsGroup={majorsClassName} majorsData={majorsData}/>





    </div>
  );
}

export default Result;
