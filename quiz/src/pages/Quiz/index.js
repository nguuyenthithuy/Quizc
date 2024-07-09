import { useEffect, useState } from "react";
import { getListTopic, getTopic } from "../../services/topicService";
import { useNavigate, useParams } from "react-router-dom";
import { getListQuestions } from "../../services/questionsService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizService";

function Quiz() {
  const params = useParams();
  // console.log(params);
  const [dataTopic, setDataTopic] = useState();
  const [dataQuestion, setDataQuestion] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopic(params.id);
      // console.log(response);
      setDataTopic(response);
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListQuestions(params.id);
      // console.log(response);
      setDataQuestion(response);
    };
    fetchApi();
  }, []);
  // console.log(dataQuestion);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);

    let seclectedAnswer = [];

    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;

        seclectedAnswer.push({
          questionId: parseInt(name),
          answer: parseInt(value),
        });
        // console.log(name, value);
      }
    }
    console.log(seclectedAnswer);
    const options = {
      userId: getCookie("id"),
      topicId: params.id,
      answers: seclectedAnswer,
    };
    const response = await createAnswer(options);
    console.log(response);
    if (response) {
      navigate(`/result/${response.id}`);
    }
  };
  return (
    <>
      <h2>Bài Quiz chủ đề: {dataTopic && <>{dataTopic.name}</>}</h2>
      <div className="form-quiz">
        <form onSubmit={handleSubmit}>
          {dataQuestion.map((item, index) => (
            <div className="form-quiz__item">
              <p>
                Câu {index + 1}: {item.question}
              </p>
              {item.answers.map((itemAns, indexAns) => (
                <div className="form-quiz__answaer" key={indexAns}>
                  <input
                    type="radio"
                    name={item.id}
                    value={indexAns}
                    id={`quiz-${item.id}-${indexAns}`}
                  />
                  <label htmlFor={`quiz-${item.id}-${indexAns}`}>
                    {itemAns}
                  </label>
                </div>
              ))}
            </div>
          ))}

          <button type="submit">Nộp bài</button>
        </form>
      </div>
    </>
  );
}
export default Quiz;
