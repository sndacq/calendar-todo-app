import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';

import ServiceOptions from './ServiceOptions';

import styles from '../../styles/Home.module.css';

const Modal = ({
  open,
  setOpen,
  activeDetails,
  setActiveDetails,
  createEvent,
  updateEvent,
  deleteEvent,
  customServices,
  setCustomServices,
}) => {
  const [edit, setEdit] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    setActiveDetails({});
    setSelectedServices([]);
  };

  const handleNameChange = (e) => {
    setActiveDetails({
      ...activeDetails,
      title: e.target.value
    });
  };

  const handleDateChange = (e) => {
    setActiveDetails({
      ...activeDetails,
      start: e.target.value
    });
  };

  useEffect(() => {
    setActiveDetails({ ...activeDetails, services: selectedServices});
  }, [selectedServices]);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") handleClose()
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const basicServices = ['General Cleaning', 'Wash Clothes', 'Maintenance'];

  const handleServiceChange = (item) => {
    if(selectedServices.includes(item)) {
      const filteredServices = selectedServices.filter(svc => svc !== item);
      setSelectedServices(filteredServices);
    } else setSelectedServices([...selectedServices, item]);
  };

  const renderContent = () => {
    return edit || activeDetails.create ? (
      <>
        <div>
          Event Name: <input onChange={handleNameChange} value={activeDetails.title}/>
        </div>
        <div>
          Event Date: <input type="date" onChange={handleDateChange} value={activeDetails.start}/>
        </div>
        <div>
          Services: 
          <div>
            {basicServices.map((item, idx) => {
              return (
                <div 
                  onClick={() => handleServiceChange(item)}
                  className={styles.basicServiceItem}
                  key={item + idx}
                >
                  <input
                    type="checkbox"
                    id={item + idx}
                    name={'service-'+idx}
                    checked={selectedServices.includes(item)}
                    onChange={() => handleServiceChange(item)}
                  />
                  {item}
                </div>
              )
            })}
            <ServiceOptions
              items={customServices}
              setItems={setCustomServices}
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              handleServiceChange={handleServiceChange}
            />
          </div>

        </div>
      </>
    ) : (
      <>
        <div>
          Event Name: {activeDetails.title}
        </div>
        <div>
          Event Date: {activeDetails.start}
        </div>
        <div>
          {'Services: '}<ul>{activeDetails.services.map((s, idx) => <li key={s + idx}>{s}</li>)}</ul>
        </div>
      </>
    );
  };

  const handleAction = (action) => {
    action(activeDetails);
    setEdit(false);
  };

  return open ? (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          {!activeDetails.create && (
            <>
              <Image
                src="/edit.svg"
                alt="edit"
                className={styles.logo}
                onClick={() => setEdit(!edit)}
                height={20}
                width={20}
              />
              <Image
                src="/delete.svg"
                alt="delete"
                className={styles.logo}
                onClick={() => deleteEvent()}
                width={20}
                height={20}
              />
           </>
          )}
          <Image 
            src="/close.svg"
            alt="close"
            className={styles.logo}
            onClick={handleClose}
            width={20}
            height={20}
          />
        </div>
        <div className={styles.modalContent}>
          {renderContent()}
        </div>
        <div className={styles.modalFooter}>
          {activeDetails.create ? (
            <button
              onClick={() => handleAction(createEvent)}
              disabled={activeDetails.title === ''}
            >
              Create
            </button>
          ) : (
            edit && (
            <button onClick={() => handleAction(updateEvent)}>
              Update
            </button>
            )
          )}
            <button onClick={handleClose}>
              Cancel
            </button>
        </div>
      </div>
    </div>
  ) : (<></>)
};

export default Modal;