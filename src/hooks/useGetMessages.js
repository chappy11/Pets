import { MessageConnection } from "../services/ApiClient";

export default function useGetMessages(props) {
  const [data, setData] = useState([]);

  const getData = async() => {
    if (props.type == "customer") {
        const resp = await
    }
  };
}
