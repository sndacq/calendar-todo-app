import { useEffect } from 'react';
import Option from './Option';
import styles from '../../styles/Home.module.css';

const ServiceOptions = ({
  items = [],
  setItems,
  selectedServices,
  setSelectedServices,
  handleServiceChange
}) => {

  const handleSave = (prevText, text) => {
    let updatedList = items;
    const editedIdx = items.findIndex(s => s === prevText);
    updatedList[editedIdx] = text;
    setItems(updatedList);

    let selectedList = selectedServices;
    const editedSelected = selectedServices.findIndex(s => s === prevText);
    if (editedSelected) selectedList[editedSelected] = text;
    setSelectedServices(selectedList);
  };

  const handleDelete = (text) => {
    let updatedList = items.filter(s => s !== text);
    setItems(updatedList);

    let selectedList = selectedServices.filter(s => s !== text);
    setSelectedServices(selectedList);
  };

  const renderCustomServices = () => {
    return items.map((item, idx) => {
      return (
        <div className={styles.customServiceItem} key={item + idx}>
          <input
            type="checkbox"
            id={item + idx}
            name={'service-'+idx}
            checked={selectedServices.includes(item)}
            onChange={() => handleServiceChange(item)}
          />
          <Option
            text={item}
            handleSave={handleSave}
            handleDelete={handleDelete}
          />
        </div>
      )
    });
  };

  const handleAddItem = () => {
    setItems([...items, 'New Service'])
  };

  return (
    <>
    {renderCustomServices()}
    <button onClick={handleAddItem}>Add new item...</button>
    </>
  );
};

export default ServiceOptions;
