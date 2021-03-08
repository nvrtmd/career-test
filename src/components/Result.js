import axios from "axios";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import React, { Component } from "react";
import { NameContext, GenderContext } from "../App";
import "./Result.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Result() {
  const { name, setName } = useContext(NameContext);
  const { gender, setGender } = useContext(GenderContext);
  const params = useParams();
  const [wonScore, setWonScore] = useState([]);
  const seq = params.seq;
  const [testDate, setTestDate] = useState("");
  const [apiUrlNo1, setApiUrlNo1] = useState("");
  const [apiUrlNo2, setApiUrlNo2] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [majorsData, setMajorsData] = useState([]);
  const apiReportUrl =
    `https://inspct.career.go.kr/inspct/api/psycho/report?seq=` + seq;
  const apiMajorsUrl = useMemo(() => {
    return `https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${apiUrlNo1}&no2=${apiUrlNo2}`;
  }, [apiUrlNo1, apiUrlNo2]);

  const apiJobsUrl = useMemo(() => {
    return `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${apiUrlNo1}&no2=${apiUrlNo2}`;
  }, [apiUrlNo1, apiUrlNo2]);

  const jobsClassNames = ["중졸이하", "고졸", "전문대졸", "대졸", "대학원졸"];
  const majorsClassNames = [
    "계열무관",
    "인문",
    "사회",
    "교육",
    "공학",
    "자연",
    "의학",
    "예체능",
  ];

  const getReportResult = useCallback(async () => {
    const reportRes = await axios.get(apiReportUrl);
    const testBeginDtm = reportRes.data.inspct.beginDtm;
    setTestDate(testBeginDtm.split("T")[0]);

    const resWonScore = reportRes.data.result.wonScore.split(" ");
    resWonScore.pop();
    setWonScore((current) => {
      for (var i = 0; i < resWonScore.length; i++) {
        const variable = resWonScore[i].split("=")[1];
        current.push(variable);
      }
      return current;
    });

    const sortedWonScore = [...wonScore];
    sortedWonScore.sort(function (a, b) {
      return b - a;
    });

    const sortedWonScore1stMax = sortedWonScore[0];
    const sortedWonScore2ndMax = sortedWonScore[1];
    if (sortedWonScore1stMax === sortedWonScore2ndMax) {
      const sortedWonScore1stMaxIdx =
        wonScore.indexOf(sortedWonScore1stMax) + 1;
      const sortedWonScore2ndMaxIdx =
        wonScore.lastIndexOf(sortedWonScore2ndMax) + 1;
      return (
        setApiUrlNo1(sortedWonScore1stMaxIdx),
        setApiUrlNo2(sortedWonScore2ndMaxIdx)
      );
    } else {
      const sortedWonScore1stMaxIdx =
        wonScore.indexOf(sortedWonScore1stMax) + 1;
      const sortedWonScore2ndMaxIdx =
        wonScore.indexOf(sortedWonScore2ndMax) + 1;
      return (
        setApiUrlNo1(sortedWonScore1stMaxIdx),
        setApiUrlNo2(sortedWonScore2ndMaxIdx)
      );
    }
  }, [apiReportUrl]);

  const getJobsResult = useCallback(async () => {
    const jobsRes = await axios.get(apiJobsUrl);
    setJobsData(jobsRes.data);
  }, [apiJobsUrl]);

  const getMajorsResult = useCallback(async () => {
    const majorsRes = await axios.get(apiMajorsUrl);
    setMajorsData(majorsRes.data);
  }, [apiMajorsUrl]);

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
    return [
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
    ];
  }, [apiUrlNo1, apiUrlNo2]);

  const handleRestart = () => {
    setName("");
    setGender("");
  };

  return (
    <div className="whole_div">
      <h1>직업가치관검사 결과표</h1>
      <div>
        직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과
        신념입니다. <br />
        따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을
        한다고 볼 수 있습니다. <br />
        직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를
        중요하게 생각하는지를 알려줍니다.
        <br />
        또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해
        생각해 볼 기회를 제공합니다.
      </div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">이름</th>
            <th scope="col">성별</th>
            <th scope="col">검사일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>

            {gender === "100324" ? <td>여성</td> : <td>남성</td>}

            <td>{testDate}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <h2>직업가치관결과</h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart
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
            <Bar dataKey="score" fill="#94A7EC" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <br />
      <br />
      <br />

      <h2>가치관과 관련이 높은 직업</h2>
      <br />
      <h3>종사자 평균 학력별</h3>

      <table className="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col" style={{ minWidth: 150 }}>
              분야
            </th>
            <th scope="col">직업</th>
          </tr>
        </thead>

        {jobsClassNames.map((jobsClassName, jobsClassNameIdx) => {
          const classifiedJobs = Array.from(jobsData).filter((jobs) => {
            return jobs[2] === jobsClassNameIdx + 1;
          });
          return (
            <tr
              scope="row"
              style={classifiedJobs.length <= 0 ? { display: "none" } : {}}
            >
              <td>{jobsClassName}</td>
              <td>
                {classifiedJobs.map((classifiedJob) => {
                  const [classifiedJobSeq, classifiedJobName] = classifiedJob;
                  return (
                    <a
                      style={{
                        display: "inline-block",
                        marginRight: 10,
                        color: "#8496D6",
                      }}
                      href={`https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${classifiedJobSeq}`}
                      target="_blank"
                    >
                      {classifiedJobName}
                    </a>
                  );
                })}
              </td>
            </tr>
          );
        })}
      </table>
      <br />
      <h3>종사자 평균 전공별</h3>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col" style={{ minWidth: 150 }}>
              분야
            </th>
            <th scope="col">직업</th>
          </tr>
        </thead>

        {majorsClassNames.map((majorsClassName, majorsClassNameIdx) => {
          const classifiedJobs = Array.from(majorsData).filter((majorsJobs) => {
            return majorsJobs[2] === majorsClassNameIdx;
          });
          return (
            <tr
              scope="row"
              style={classifiedJobs.length <= 0 ? { display: "none" } : {}}
            >
              <td>{majorsClassName}</td>
              <td>
                {classifiedJobs.map((classifiedJob) => {
                  const [
                    classifiedMajorsJobSeq,
                    classifiedMajorsJobName,
                  ] = classifiedJob;
                  return (
                    <a
                      style={{
                        display: "inline-block",
                        marginRight: 10,
                        color: "#8496D6",
                      }}
                      href={`https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${classifiedMajorsJobSeq}`}
                      target="_blank"
                    >
                      {classifiedMajorsJobName}
                    </a>
                  );
                })}
              </td>
            </tr>
          );
        })}
      </table>
      <br />
      <div>
        <Link to="/">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleRestart}
          >
            다시 검사하기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Result;
