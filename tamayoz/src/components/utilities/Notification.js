import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import axiosInstance from "../../helpers/AxiosInstance";

const Container = styled.div`
  padding: 20px 30px;
  background: ${(props) => (props.active ? "#E7F1FA" : "white")};
  border-radius: 10px;
  cursor: pointer;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 50px;
  row-gap: 20px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    justify-content: center;
  }
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: ${(props) => (props.primary ? "var(--primary-color)" : "#252e48")};
  text-transform: capitalize;
  opacity: 1;
  @media (max-width: 1440px) {
    font-size: 18px;
  }
  @media (max-width: 1024px) {
    font-size: 18px;
  }
`;
const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 25px;
`;
const ItemContainer = styled.div`
  display: flex;
  gap: 5px;
`;
const NotificationItem = styled.div`
  font-size: ${(props) => (props.small ? "18px" : "20px")};
  font-weight: 600;
  letter-spacing: 0px;
  color: #010e3f;
  margin-top: 10px;
  @media (max-width: 1440px) {
    font-size: ${(props) => (props.small ? "15px" : "18px")};
  }
`;

// function dismissNotifcation(Serial) {
//   const instance = axiosInstance();
//   instance.post(`DismissNotification/${Serial}`);
// }

export default function Notification({
  notificationIndex,
  notifications,
  setNotifications,
  primary,
  Status,
  AWB,
  Body,
  Serial,
}) {
  const navigate = useNavigate();
  const { language } = useTranslation().i18n;
  const [active, setActive] = useState(false);
  return primary ? (
    <Container
      active={active}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => {
        // dismissNotifcation(Serial);
        navigate(`/shipment/${AWB}`);
      }}
    >
      <Header>
        <ItemContainer>
          <Title>
            {language === "ar" ? "الشحنة رقم" : "Shipment No"}
            {" :"}
          </Title>
          <Title>{AWB}</Title>
          <Title>--</Title>
          <Title primary>{Status}</Title>
        </ItemContainer>
        <Title primary>{AWB}</Title>
      </Header>
      <ContentContainer>
        {Body.split("\n")
          .filter((item) => item.split(":")[1] !== " ")
          .map((item, index) => (
            <ItemContainer key={index}>
              <NotificationItem>
                {item.split(":")[0]}
                {` :`}
              </NotificationItem>
              <NotificationItem style={{ color: "var(--primary-color)" }}>
                {item.split(":")[1]}
              </NotificationItem>
            </ItemContainer>
          ))}
      </ContentContainer>
    </Container>
  ) : (
    <Container
      active={active}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => {
        navigate(`/shipment/${AWB}`);
        // dismissNotifcation(Serial);
        setNotifications(
          notifications.filter(
            (notification, index) => index !== notificationIndex
          )
        );
      }}
    >
      <Header>
        <ItemContainer>
          <Title primary>
            {language === "ar" ? "الشحنة رقم" : "Shipment No"}
            {" :"}
          </Title>
          <Title primary>{AWB}</Title>
          <Title primary>--</Title>
          <Title primary>{Status}</Title>
        </ItemContainer>
      </Header>
      {Body.split("\n").map((item, index) => (
        <NotificationItem key={index} small>
          {item}
        </NotificationItem>
      ))}
    </Container>
  );
}
