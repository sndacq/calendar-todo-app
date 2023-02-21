import {
  FC, Dispatch, useEffect, useCallback, useState,
} from 'react';
import Image from 'next/image';

import ServiceOptions from './ServiceOptions';
import FileUpload from './FileUpload';
import FilePreview from './FilePreview';

import { IActiveDetails } from '../../utils/types';

import styles from '../../styles/Home.module.css';

interface IModalProps {
  open: boolean;
  setOpen: Dispatch<boolean>;
  activeDetails: IActiveDetails;
  setActiveDetails: Dispatch<IActiveDetails>;
  createEvent: Dispatch<IActiveDetails>;
  updateEvent: Dispatch<IActiveDetails>;
  deleteEvent: () => void;
  customServices: string[];
  setCustomServices: Dispatch<string[]>;
}

const Modal: FC<IModalProps> = ({
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
  const [selectedServices, setSelectedServices] = useState([] as string[]);

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    setActiveDetails({} as IActiveDetails);
    setSelectedServices([]);
  };

  const handleNameChange = (e) => {
    setActiveDetails({
      ...activeDetails,
      title: e.target.value,
    });
  };

  const handleDateChange = (e) => {
    setActiveDetails({
      ...activeDetails,
      start: e.target.value,
    });
  };

  useEffect(() => {
    setActiveDetails({ ...activeDetails, services: selectedServices });
  }, [selectedServices]);

  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') handleClose();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const basicServices = ['General Cleaning', 'Wash Clothes', 'Maintenance'];

  const handleServiceChange = (item) => {
    if (selectedServices.includes(item)) {
      const filteredServices = selectedServices.filter((svc) => svc !== item);
      setSelectedServices(filteredServices);
    } else setSelectedServices([...selectedServices, item]);
  };

  const renderContent = () => (edit || activeDetails.create ? (
    <>
      <div>
        Event Name:
        {' '}
        <input onChange={handleNameChange} value={activeDetails.title} />
      </div>
      <div>
        Event Date:
        {' '}
        <input type="date" onChange={handleDateChange} value={activeDetails.start} />
      </div>
      <div>
        Services:
        <div>
          {basicServices.map((item, idx) => (
            <div
              role="presentation"
              onClick={() => handleServiceChange(item)}
              onKeyDown={() => handleServiceChange(item)}
              className={styles.basicServiceItem}
              key={item}
            >
              <input
                type="checkbox"
                id={item + idx}
                name={`service-${idx}`}
                checked={selectedServices.includes(item)}
                onChange={() => handleServiceChange(item)}
              />
              {item}
            </div>
          ))}
          <ServiceOptions
            items={customServices}
            setItems={setCustomServices}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            handleServiceChange={handleServiceChange}
          />
        </div>
        <div>
          Attachments:
          <FileUpload activeDetails={activeDetails} setActiveDetails={setActiveDetails} />
        </div>
      </div>
    </>
  ) : (
    <>
      <div>
        Event Name:
        {' '}
        {activeDetails.title}
      </div>
      <div>
        Event Date:
        {' '}
        {activeDetails.start}
      </div>
      <div>
        {'Services: '}
        <ul>{activeDetails.services.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
      <div>
        <FilePreview fileList={activeDetails.attachments} />
      </div>
    </>
  ));

  const handleAction = (action) => {
    action(activeDetails);
    setEdit(false);
  };

  return open && (
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
              type="button"
              onClick={() => handleAction(createEvent)}
              disabled={activeDetails.title === ''}
            >
              Create
            </button>
          ) : (
            edit && (
            <button type="button" onClick={() => handleAction(updateEvent)}>
              Update
            </button>
            )
          )}
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
