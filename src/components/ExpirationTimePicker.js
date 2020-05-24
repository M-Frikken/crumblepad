import React from 'react';
import { IonPicker } from '@ionic/react';
import { getTimeStringFromNumbers, getMsValueFromNumber } from '../utils/time';

const ExpirationTimePicker = ({ isPickerOpen, setIsPickerOpen, updateExpiratonOptions }) => {
    const days = [
        { text: 0, value: 0, selected: true },
        ...Array.from(({ length: 100 }), (_, i) => ({ text: i + 1, value: i + 1 }))
    ];
    const minutes = days.slice(0, 60);
    const hours = minutes.slice(0, 24);

    const closeHandler = (e) => {
        setIsPickerOpen(false);
    }

    const saveHandler = (value) => {
        setIsPickerOpen(false);
        const { days, hours, minutes, seconds } = value;
        const timeString = getTimeStringFromNumbers(
            days.value, hours.value, minutes.value, seconds.value
        );
        if (!timeString.length) return;

        const timeValue = getMsValueFromNumber(
            days.value, hours.value, minutes.value, seconds.value
        )
        updateExpiratonOptions({ title: timeString, val: timeValue });
    }

    return (
        <IonPicker
          isOpen={ isPickerOpen }
          columns={[
            { name: 'days', suffix: 'd', options: days },
            { name: 'hours', suffix: 'h', options: hours },
            { name: 'minutes', suffix: 'm', options: minutes },
            { name: 'seconds', suffix: 's', options: minutes }
          ]}
          buttons={[
            { text: 'close', handler: closeHandler },
            { text: 'save', handler: saveHandler }
          ]}
          id="dateTimePicker"
        />
    )
}

export default ExpirationTimePicker;