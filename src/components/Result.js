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

function Result() {
  const { name, setName } = useContext(NameContext);
  const { gender, setGender } = useContext(GenderContext);
  const params = useParams();
  const [wonScore, setWonScore] = useState();
  const seq = params.seq;
  const [testDate, setTestDate] = useState("");
  const [apiUrlNo1, setApiUrlNo1] = useState();
  const [apiUrlNo2, setApiUrlNo2] = useState();
  const apiReportUrl =
    `https://inspct.career.go.kr/inspct/api/psycho/report?seq=` + seq;
  const apiMajorsUrl = `https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${apiUrlNo1}&no2=${apiUrlNo2}`;

  const apiJobsUrl = `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${apiUrlNo1}&no2=${apiUrlNo2}`;

  const getReportResult = useCallback(async () => {
    const reportRes = await axios.get(apiReportUrl);
    const testBeginDtm = reportRes.data.inspct.beginDtm;
    setTestDate(testBeginDtm.split("T")[0]);

    const resWonScore = reportRes.data.result.wonScore.split(" ");
    resWonScore.pop();
    const wonScoreArr = [];
    for (var i = 0; i < resWonScore.length; i++) {
      wonScoreArr.push(resWonScore[i].split("=")[1]);
    }
    console.log(wonScoreArr);

    setWonScore(wonScoreArr);
    console.log(wonScore);

    const sortedWonScore = [...wonScore];
    sortedWonScore.sort(function (a, b) {
      return b - a;
    });
    console.log(sortedWonScore);

    var sortedWonScore1stMax = sortedWonScore[0];
    console.log(sortedWonScore1stMax);
    var sortedWonScore2ndMax = sortedWonScore[1];
    console.log(sortedWonScore2ndMax);

    const sortedWonScore1stMaxIdx= wonScore.indexOf(sortedWonScore1stMax) + 1;
    const sortedWonScore2ndMaxIdx = wonScore.indexOf(sortedWonScore2ndMax) + 1;

    setApiUrlNo1(sortedWonScore1stMaxIdx);
    setApiUrlNo2(sortedWonScore2ndMaxIdx);

  }, [apiReportUrl]);

  const getMajorsResult = useCallback(async () => {
    const majorsRes = await axios.get(apiMajorsUrl);
    console.log(majorsRes);
  }, [apiMajorsUrl]);

  const getJobsResult = useCallback(async () => {
    const jobsRes = await axios.get(apiJobsUrl);
    console.log(jobsRes);
  }, [apiJobsUrl]);

  // })

  useEffect(() => {
    getReportResult();
  }, [getReportResult]);

  useEffect(() => {
    getMajorsResult();
  }, [getMajorsResult]);

  useEffect(() => {
    getJobsResult();
  }, [getJobsResult]);

  const chartData = [
    {
      name: "능력발휘",
      score: wonScore[0]
    },
    {
      name: "자율성",
      score: wonScore[1]
    },
    {
      name: "보수",
      score: wonScore[2]
    },
    {
      name: "안정성",
      score: wonScore[3]
    },
    {
      name: "사회적 인정",
      score: wonScore[4]
    },
    {
      name: "사회봉사",
      score: wonScore[5]
    },
    {
      name: "자기계발",
      score: wonScore[6]
    },
    {
      name: "창의성",
      score: wonScore[7]
    },
  ];


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
      {/* <h4>{apiUrlNo1}</h4>
      <h4>{apiUrlNo2}</h4>
 */}
      <h2>직업가치관결과</h2>
      <BarChart
        width={800}
        height={300}
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
    </div>
  );
}

export default Result;
