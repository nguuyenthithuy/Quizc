import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnswers } from "../../services/answers";
import { getListQuestions } from "../../services/questionsService";
import "./Result.css";
function Result() {
  const params = useParams();
  // console.log(params);
  const [dataAnswers, setDataAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const datAnswer = await getAnswers(params.id);
      // console.log(datAnswer.answers);
      const dataQuestion = await getListQuestions(datAnswer.topicId);
      // console.log(dataQuestion);

      const resultFinal = [];
      for (let i = 0; i < dataQuestion.length; i++) {
        resultFinal.push({
          ...dataQuestion[i],
          ...datAnswer.answers.find(
            (item) => item.questionId === parseInt(dataQuestion[i].id)
          ),
        });
      }
      // console.log(resultFinal);
      setDataAnswers(resultFinal);
    };
    fetchApi();
  }, []);
  console.log(dataAnswers);

  return (
    <>
      <h2>Kết quả</h2>
      <div className="result__list">
        {dataAnswers.map((item, index) => (
          <div className="result__item">
            <p>
              Câu {index + 1}: {item.question}
              {item.correctAnswer === item.answer ? (
                <span className="result__tag result__tag--true">Đúng</span>
              ) : (
                <span className="result__tag result__tag--false">Sai</span>
              )}
            </p>
            {item.answers.map((itemAns, indexAns) => {
              console.log(indexAns);
              let className = "";
              let checked = false;
              if (item.answer === indexAns) {
                checked = true;
                className = "result__item--selected";
              }
              if (item.correctAnswer === indexAns) {
                className += " result_item--result";
              }
              return (
                <div className={className} key={indexAns}>
                  <input type="radio" disabled checked={checked} />
                  <label>{itemAns}</label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
export default Result;
