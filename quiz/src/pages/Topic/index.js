import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListTopic } from "../../services/topicService";
function Topic() {
  const [dataTopic, setDataTopic] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTopic();
      // console.log(response);
      setDataTopic(response);
    };
    fetchApi();
  }, []);
  console.log(dataTopic);
  return (
    <>
      <h2>Danh sách chủ đề</h2>
      {dataTopic.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chủ đề</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataTopic.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={"/quiz/" + item.id}>Làm bài</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
export default Topic;
