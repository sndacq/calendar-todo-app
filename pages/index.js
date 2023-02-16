import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '../styles/Home.module.css';

import Head from 'next/head';
import Image from 'next/image';

import Modal from './components/Modal';
import Calendar from './components/Calendar';

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeDetails, setActiveDetails] = useState({});
  const [customServices, setCustomServices] = useState([]);

  const todayStr = new Date().toISOString().replace(/T.*$/, '');  
  const initialEvents = [
    {
      id: uuidv4(),
      title: 'sample event',
      start: todayStr,
      services: ['General Cleaning', 'Maintenance'],
    },
  ];

  const [events, setEvents] = useState(initialEvents)

  const createEvent = (event) => {
    const { create, ...rest } = event
    setEvents([...events, {...rest, id: uuidv4()}]);
    setActiveDetails({});
    setModalOpen(false);
  };

  const updateEvent = (event) => {
    let eventList = [...events]
    const eventIdx = eventList.findIndex((item => item.id === event.id));
    eventList[eventIdx] = event;

    setEvents(eventList);
    setActiveDetails({});
    setModalOpen(false);
  };

  const deleteEvent = () => {
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    const updatedList = events.filter((item => item.id !== activeDetails.id));

    setEvents(updatedList);
    setActiveDetails({});
    setModalOpen(false);
    setDialogOpen(false);
  };

  return (
    <>
      <Head>
        <title>Calendar Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <div className="demo-app">
          <div className="demo-app-main">
            <Calendar
              events={events}
              activeDetails={activeDetails}
              setActiveDetails={setActiveDetails}
              setModalOpen={setModalOpen}
            />
          </div>
        </div>
      </div>
      <Modal 
        open={modalOpen}
        setOpen={setModalOpen}
        activeDetails={activeDetails}
        setActiveDetails={setActiveDetails}
        customServices={customServices}
        setCustomServices={setCustomServices}
        createEvent={createEvent}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
      />
      {dialogOpen && (
        <div className={styles.modal}>
          <div className={styles.dialogContainer}>
            <div className={styles.modalHeader}>
            <Image
              src="/close.svg"
              alt="close"
              className={styles.logo}
              onClick={() => setDialogOpen(false)}
              width={20}
              height={20}
            />
        </div>
        <div className={styles.modalContent}>
          {'Are you sure you want to delete this item?'}
        </div>
        <div className={styles.modalFooter}>
          <button onClick={() => confirmDelete()}>
            Yes
          </button>
          <button onClick={() => setDialogOpen(false)}>
            No
          </button>
        </div>
      </div>
    </div>
      )}
    </>
  )
}

export default Home;
