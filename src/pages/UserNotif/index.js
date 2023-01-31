import {
  Container,
  HeaderText,
  Navigation,
  NotificationItem,
  SizeBox,
} from "../../components";
import useGetNotification from "../../hooks/useGetNotification";
import { Notification } from "../../services/Notification";

export default function UserNotif() {
  const { data, getData } = useGetNotification();

  async function handleclick(notif_id, link) {
    try {
      const resp = await Notification.read(notif_id);

      if (resp.data?.status == "1") {
        window.location.href = link;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <Navigation />
      <SizeBox height={20} />
      <Container>
        <HeaderText>Notification</HeaderText>
        <SizeBox height={20} />
        {data?.map((val, i) => (
          <NotificationItem
            header={val.notif_title}
            message={val.notif_message}
            onClick={() => handleclick(val.notif_id, val.notif_link)}
            isRead={val.isRead}
            key={i.toString()}
          />
        ))}
      </Container>
    </>
  );
}
