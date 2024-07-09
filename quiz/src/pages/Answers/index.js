import { useEffect, useState } from "react";
import { getAnswersById } from "../../services/answers";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
function Answers() {
  const [dataAnswers, setDataAnswers] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const answersByUserId = await getAnswersById();
      const topic = await getListTopic();
      // console.log(topic);
      // console.log(answersByUserId);
      // setDataTopic(response);

      let result = [];
      for (let i = 0; i < answersByUserId.length; i++) {
        result.push({
          ...topic.find((item) => item.id === answersByUserId[i].topicId),
          ...answersByUserId[i],
        });
      }
      // console.log(result);
      setDataAnswers(result.reverse());
    };
    fetchApi();
  }, []);

  console.log(dataAnswers);
  return (
    <>
      <h2>Danh sách bài đã luyện tập</h2>
      {dataAnswers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chủ đề</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataAnswers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={"/result/" + item.id}>Xem chi tết</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
export default Answers;
