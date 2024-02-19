import React, {useEffect, useState} from "react";
import Loader from "@/dashoboard/common/Loader";

interface Contact {
    id: number;
    username: string;
    initial: string;
}

type IProps = {
    userContacts: Contact[]|null;
    sendDataToParent: (data: any) => void;
};

const ContactList: React.FC<IProps> = ({userContacts, sendDataToParent}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userContacts && userContacts.length > 0) {
            setLoading(false);
        }
    }, [userContacts]);

    const handleCurrentContact = (id: number) => {
        sendDataToParent(id);
    }

    return (
        <div className="sticky border-r border-stroke dark:border-strokedark xl:w-1/4">
            <div
                className="sticky flex items-center justify-between border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
                    Active Conversations
                </h3>
            </div>
            <div className="flex max-h-full flex-col overflow-auto p-5">
                <form className="sticky mb-7" data-np-autofill-form-type="other" data-np-checked="1"
                      data-np-watching="1">
                    <input type="text"
                           className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
                           placeholder="Search..." data-last-active-input=""/>
                </form>

                <div className="scrollbar max-h-full space-y-2.5 overflow-auto">
                    {
                        loading ? <Loader/> :
                            userContacts?.map((contact, index) => (
                                <div
                                    onClick={() => handleCurrentContact(contact.id)}
                                    key={contact.id}
                                    className="flex cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark">
                                    <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-lg">
                                        <img
                                            src={`https://placehold.co/200X200/000000/FFF?text=${contact.initial}&font=Montserrat`}
                                            alt="profile"
                                            className="h-full w-full object-cover object-center rounded-full"/>
                                    </div>
                                    <div className="w-full">
                                        <h5 className="text-sm font-medium text-black dark:text-white text-ellipsis overflow-hidden">
                                            {contact.username}
                                        </h5>
                                        <p className="text-sm">
                                            I cam across your profile and...
                                        </p>
                                    </div>
                                </div>
                                )
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default ContactList;