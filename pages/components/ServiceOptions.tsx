import { Dispatch, FC } from 'react';

import Option from './Option';
import styles from '../../styles/Home.module.css';

interface IServiceOptionsProps {
  items: string[];
  setItems: Dispatch<string[]>;
  selectedServices: string[];
  setSelectedServices: Dispatch<string[]>;
  handleServiceChange: Dispatch<string>;
}

const ServiceOptions: FC<IServiceOptionsProps> = ({
  items = [],
  setItems,
  selectedServices,
  setSelectedServices,
  handleServiceChange,
}) => {
  const handleSave = (prevText, text) => {
    const updatedList = items;
    const editedIdx = items.findIndex((s) => s === prevText);
    updatedList[editedIdx] = text;
    setItems(updatedList);

    const selectedList = selectedServices;
    const editedSelected = selectedServices.findIndex((s) => s === prevText);
    if (editedSelected) selectedList[editedSelected] = text;
    setSelectedServices(selectedList);
  };

  const handleDelete = (text) => {
    const updatedList = items.filter((s) => s !== text);
    setItems(updatedList);

    const selectedList = selectedServices.filter((s) => s !== text);
    setSelectedServices(selectedList);
  };

  const renderCustomServices = () => items.map((item, idx) => (
    <div className={styles.customServiceItem} key={item}>
      <input
        type="checkbox"
        id={item + idx}
        name={`service-${idx}`}
        checked={selectedServices.includes(item)}
        onChange={() => handleServiceChange(item)}
      />
      <Option
        text={item}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </div>
  ));

  const handleAddItem = () => {
    setItems([...items, 'New Service']);
  };

  return (
    <>
      {renderCustomServices()}
      <button type="button" onClick={handleAddItem}>Add new item...</button>
    </>
  );
};

export default ServiceOptions;
