import React, { useEffect, useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Form, json, redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const NotificationContainer = () => {


const {notifications}=useLoaderData()
    const [notificationList, setNotificationList] = useState(notifications);


  
    const updateNotifications = async (id) => {
        try {
            const response = await customFetch.patch(`/notifications/${id}`, { read: true });
            const updatedNotification = response.data.notification;
            setNotificationList((prevList) =>
                prevList.map((notification) =>
                    notification._id === updatedNotification._id ? updatedNotification : notification
                )
            );
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            return error;
        }
    };

    const unreadNotifications = notificationList.filter((item) => item.read === false);

  
    return (
        <div className="indicator">
            <details className="dropdown">
                <summary className="btn m-1">
                    {unreadNotifications.length > 0 && (
                        <span className="indicator-item badge bg-red-600 border-hidden">
                            {unreadNotifications.length}
                        </span>
                    )}
                    <IoIosNotificationsOutline className="h-8 w-8 cursor-pointer" />
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {notificationList.map((item, index) => {
                        const { read, _id, message,type } = item;
                        return !read && type === "outofStock"  ? (
                            <button onClick={() => updateNotifications(_id)} key={index}>
                                <li className="bg-red-50">
                                    <a>{message}</a>
                                </li>
                            </button>
                            
                        ) : (
                           
                           !read && type === "order"  ? (
                            <button onClick={() => updateNotifications(_id)} key={index}>
                                <li className="bg-green-50">
                                    <a>{message}</a>
                                </li>
                            </button>
                           ):(
                            <></>
                           )
                        )
                    })}
                </ul>
            </details>
        </div>
    );
};

export default NotificationContainer;
