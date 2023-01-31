import { Container, HeaderText, NotificationItem } from "../../../components";
import useGetNotification from "../../../hooks/useGetNotification";
import { Notification } from "../../../services/Notification";
import Sidebar from "../component/Sidebar";

export default function AdminNotif() {
  const { data, getData } = useGetNotification();

  async function handleRead(notif_id, link) {
    try {
      const resp = await Notification.read(notif_id);

      if (resp?.data?.status == "1") {
        window.location.href = link;
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Sidebar>
      <Container>
        <HeaderText>Notification</HeaderText>
        {data?.map((val, i) => (
          <NotificationItem
            header={val.notif_title}
            message={val.notif_message}
            onClick={() => handleRead(val.notif_id, val.notif_link)}
            isRead={val.isRead}
            date={val.notif_date}
          />
        ))}
      </Container>
    </Sidebar>
  );
}
