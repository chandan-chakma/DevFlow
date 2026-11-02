import { de } from "date-fns/locale";
import { io} from "socket.io-client";

const socket = io('https://devflow-server-kin7.onrender.com', {
    autoConnect: false,
    withCredentials: true,
});

export default socket;
