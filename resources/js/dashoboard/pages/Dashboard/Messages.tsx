import React, { useState, useEffect } from "react";
import DefaultLayout from "@/dashoboard/layout/DefaultLayout";
import Breadcrumb from "@/dashoboard/components/Breadcrumbs/Breadcrumb";
import ContactList from "@/dashoboard/pages/Dashboard/components/ContactList";
import ActiveChat from "@/dashoboard/pages/Dashboard/components/ActiveChat";
import axios from "axios";

const Messages: React.FC = () => {
  const [contacts, setContacts] = useState(null);
  const [activeUser, setActiveUser] = useState();
  const [activeUserMessage, setActiveUserMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user");
        const { data } = response;
        setContacts(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDataFromChild = (id: number) => {
    axios.get("/api/get-user/" + id).then((response) => {
      const { data } = response;

      setActiveUser(data.receiver);
      setActiveUserMessage(data.messages);
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Messages" />
      <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark h-full rounded-sm border bg-white xl:flex">
          <ContactList
            userContacts={contacts}
            sendDataToParent={handleDataFromChild}
          />
          <ActiveChat
            activeUser={activeUser}
            activeUserMessage={activeUserMessage}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Messages;
