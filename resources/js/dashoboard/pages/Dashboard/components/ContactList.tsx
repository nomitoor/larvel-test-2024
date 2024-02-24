import React, { useEffect, useState } from "react";
import Loader from "@/dashoboard/common/Loader";

interface Contact {
  id: number;
  username: string;
  initial: string;
}

type IProps = {
  userContacts: Contact[] | null;
  sendDataToParent: (data: any) => void;
};

const ContactList: React.FC<IProps> = ({ userContacts, sendDataToParent }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userContacts && userContacts.length > 0) {
      setLoading(false);
    }
  }, [userContacts]);

  const handleCurrentContact = (id: number) => {
    sendDataToParent(id);
  };

  return (
    <div className="border-stroke dark:border-strokedark sticky border-r xl:w-1/4">
      <div className="border-stroke py-7.5 dark:border-strokedark sticky flex items-center justify-between border-b px-6">
        <h3 className="text-lg font-medium text-black 2xl:text-xl dark:text-white">
          Active Conversations
        </h3>
      </div>
      <div className="flex max-h-full flex-col overflow-auto p-5">
        <form
          className="sticky mb-7"
          data-np-autofill-form-type="other"
          data-np-checked="1"
          data-np-watching="1"
        >
          <input
            type="text"
            className="border-stroke bg-gray-2 focus:border-primary dark:border-strokedark dark:bg-boxdark-2 w-full rounded border py-2.5 pl-5 pr-10 text-sm outline-none"
            placeholder="Search..."
            data-last-active-input=""
          />
        </form>

        <div className="scrollbar max-h-full space-y-2.5 overflow-auto">
          {loading ? (
            <Loader />
          ) : (
            userContacts?.map((contact, index) => (
              <div
                onClick={() => handleCurrentContact(1)}
                key={contact.id}
                className="hover:bg-gray-2 dark:hover:bg-strokedark flex cursor-pointer items-center rounded px-4 py-2"
              >
                <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-lg">
                  <img
                    src={`https://placehold.co/200X200/000000/FFF?text=${contact.initial}&font=Montserrat`}
                    alt="profile"
                    className="h-full w-full rounded-full object-cover object-center"
                  />
                </div>
                <div className="w-full">
                  <h5 className="overflow-hidden text-ellipsis text-sm font-medium text-black dark:text-white">
                    {contact.username}
                  </h5>
                  <p className="text-sm">I cam across your profile and...</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
