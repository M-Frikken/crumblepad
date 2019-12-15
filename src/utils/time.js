export const SECONDS_IN_MS = 1000;
export const MINUTE_IN_MS = 60 * SECONDS_IN_MS;
export const HOUR_IN_MS = 60 * MINUTE_IN_MS;
export const DAY_IN_MS = 24 * HOUR_IN_MS;


export const timeLeft = (timeInMs) => {
    const difference = getTimeDifference(timeInMs);
    if (isExpired(timeInMs)) return '';

    const days = Math.floor(difference / DAY_IN_MS);
    const hours = Math.floor(difference / HOUR_IN_MS) % 24;
    const minutes = Math.floor(difference / MINUTE_IN_MS) % 60;
    const seconds = Math.floor(difference / SECONDS_IN_MS) % 60;
    return `${plur(days, 'day')}${plur(hours, 'hour')}${plur(minutes, 'minute')}${plur(seconds, 'second')}`
}

const plur = (variable, name) => {
    if (variable <= 0) return '';
    return `${variable} ${name}${variable > 1 ? 's' : ''} `;
}

const getTimeDifference = (timeInMs) => {
    const timeNow = new Date().getTime();
    return timeInMs - timeNow;
}

export const isExpired = (timeInMs) => {
    return getTimeDifference(timeInMs) <= 1000;
}