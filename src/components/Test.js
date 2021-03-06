import axios from "axios";
import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import React, { Component } from "react";
import { NameContext, GenderContext } from "../App";
import "./Test.css";
import ProgressBar from "react-bootstrap/ProgressBar";

const Test = () => {
  const apiUrl = `http://www.career.go.kr/inspct/openapi/test/questions?apikey=ad5bf9f6a1f7c1af90eff9aed50ee117&q=6`;
  const apiPostUrl = `http://www.career.go.kr/inspct/openapi/test/report`;
  const { name, setName } = useContext(NameContext);
  const { gender, setGender } = useContext(GenderContext);

  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [answChecked, setAnswChecked] = useState([]);
  const history = useHistory();

  const fetchQuestions = useCallback(async () => {
    const response = await axios.get(apiUrl);
    setQuestions(response.data.RESULT);
  }, [apiUrl]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const visibleQuestions = useMemo(() => {
    return questions.slice(page * 5, (page + 1) * 5);
  }, [page, questions]);

  const countAnswChecked = useMemo(() => {
    let count = 0;
    for (let i = 0; i < answChecked.length; i++) {
      if (answChecked[i]) {
        count++;
      }
    }
    return count;
  }, [answChecked]);

  const handlePageNext = () => {
    setPage((current) => {
      return current + 1;
    });
  };

  const handlePagePrev = () => {
    setPage((current) => {
      return current - 1;
    });
    const idx = page * 5;
    setAnswChecked(() => {
      const newAnswChecked = [];
      for (var i = 0; i < idx; i++) {
        newAnswChecked[i] = answChecked[i];
      }
      return newAnswChecked;
    });
  };

  const handlePageToFinish = async () => {
    const res = await axios.post(
      apiPostUrl,
      {
        apikey: "ad5bf9f6a1f7c1af90eff9aed50ee117",
        qestrnSeq: "6",
        trgetSe: "100209",
        name: name,
        gender: gender,
        startDtm: String(new Date().getTime()),
        answers: answChecked
          .map((item, index) => {
            return "B" + (index + 1) + "=" + item;
          })
          .join(" "),
      },
      { headers: { "Content-Type": "application/json" } }
    );
    const seq = res.data.RESULT.url.split("seq=").pop();
    history.push("/completed/" + seq);
  };

  const progressBar = useMemo(() => {
    const now = Math.round((100 / 28) * answChecked.length);
    return (
      <ProgressBar
        striped
        variant="info"
        animated
        now={now}
        label={`${now}%`}
      />
    );
  }, [answChecked]);

  return (
    <div className="whole_div">
      <div className="test_progress_bar">{progressBar}</div>
      <div>
        {visibleQuestions.map((question) => {
          const qitemNo = parseInt(question.qitemNo, 10);
          return (
            <div className="question_box">
              <div key={question.qitemNo}>
                <h5 style={{ marginTop: 15 }}>{question.question}</h5>
              </div>
              <form>
                <div className="form-check form-check-inline">
                  <label
                    className="form-check-label"
                    style={{ marginRight: 10, marginTop: 5, marginBottom: 10 }}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name={qitemNo}
                      value={question.answerScore01}
                      onChange={() => {
                        setAnswChecked((current) => {
                          const newAnswChecked = [...current];
                          newAnswChecked[qitemNo - 1] = parseInt(
                            question.answerScore01,
                            10
                          );
                          return newAnswChecked;
                        });
                      }}
                      checked={
                        answChecked[qitemNo - 1] ===
                        parseInt(question.answerScore01, 10)
                      }
                    ></input>
                    {question.answer01}
                  </label>

                  <label
                    className="form-check-label"
                    style={{ marginTop: 5, marginBottom: 10 }}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name={"B" + qitemNo}
                      value={question.answerScore02}
                      onChange={() => {
                        setAnswChecked((current) => {
                          const newAnswChecked = [...current];
                          newAnswChecked[qitemNo - 1] = parseInt(
                            question.answerScore02,
                            10
                          );
                          return newAnswChecked;
                        });
                      }}
                      checked={
                        answChecked[qitemNo - 1] ===
                        parseInt(question.answerScore02, 10)
                      }
                    ></input>
                    {question.answer02}
                  </label>
                </div>
              </form>
            </div>
          );
        })}
        <br />
      </div>
      {page > 0 ? (
        <button
          className="btn btn-info"
          onClick={handlePagePrev}
          style={{ display: "inline-block", marginRight: 10 }}
        >
          ??????
        </button>
      ) : (
        <Link to="/example">
          <button
            className="btn btn-info"
            style={{ display: "inline-block", marginRight: 10 }}
          >
            ??????
          </button>
        </Link>
      )}

      {page < 5 ? (
        <button
          className="btn btn-primary"
          onClick={handlePageNext}
          style={{ display: "inline-block", marginRight: 10 }}
          disabled={
            countAnswChecked != 0 &&
            countAnswChecked % 5 === 0 &&
            countAnswChecked / 5 - 1 === page
              ? false
              : true
          }
        >
          ?????? ?????????
        </button>
      ) : (
        <Link to="/completed">
          <button
            className="btn btn-secondary"
            onClick={handlePageToFinish}
            style={{ display: "inline-block", marginRight: 10 }}
            disabled={
              countAnswChecked != 0 && countAnswChecked % 7 === 0 ? false : true
            }
          >
            ????????????
          </button>
        </Link>
      )}
    </div>
  );
};
export default Test;
