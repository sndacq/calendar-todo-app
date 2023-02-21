import { FC, Dispatch } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { IActiveDetails } from '../../utils/types';

interface ICalendarProps {
  events: any[];
  activeDetails: IActiveDetails;
  setActiveDetails: Dispatch<IActiveDetails>;
  setModalOpen: Dispatch<boolean>;
}

const Calendar: FC<ICalendarProps> = ({
  events, activeDetails, setActiveDetails, setModalOpen,
}) => {
  const handleDateClick = (arg) => {
    setActiveDetails({
      ...activeDetails,
      start: arg.dateStr,
      create: true,
      title: '',
    });
    setModalOpen(true);
  };

  /* eslint no-underscore-dangle: 0 */
  const handleEventClick = (clickInfo) => {
    const id = clickInfo.event._def.publicId;
    const eventIdx = events.findIndex(((item) => item.id === id));

    setActiveDetails({ ...events[eventIdx] });
    setModalOpen(true);
  };

  const renderEventContent = (eventContent) => {
    const { services } = eventContent.event._def.extendedProps;
    return (
      <>
        <p>{eventContent.event.title}</p>
        <p>{services.join(', ')}</p>
      </>
    );
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next',
        center: 'title',
        right: 'today',
      }}
      initialView="dayGridMonth"
      editable
      selectMirror
      events={events}
      eventContent={renderEventContent}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
    />
  );
};

export default Calendar;
