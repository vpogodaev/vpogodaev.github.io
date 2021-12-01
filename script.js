var passedTime = document.getElementById('js-passed-time');

var timeStamp = passedTime.dataset.timeStamp;

console.log('timeStamp', timeStamp);

var newTimeStamp = getTimePassed(timeStamp);

passedTime.textContent = newTimeStamp;

function toUTC(dateTime) {
    var getUTC = dateTime.getTime();
    var offset = dateTime.getTimezoneOffset() * 60000;
    return getUTC - offset;
}

function getTimePassed(timeStamp) {
    var minute = (60 * 1000),
        hour = 60 * minute,
        day = 24 * hour,
        message = 'updated ';

    var timeFrom = new Date(toUTC(new Date(adaptForIos(timeStamp)))).getTime();
    var timeTo = new Date().getTime();

    var passedTime = timeTo - timeFrom;

    if (passedTime < hour) {
        var minutes = Math.round(passedTime / minute);
        return message + minutes + ' min ago';
    } else if (passedTime < day) {
        var hours = Math.round(passedTime / hour);
        return message + hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else {
        var days = Math.round(passedTime / day);
        return days === 1 ? (message + ' yesterday') : (message + days + ' days ago');
    }
}

function isAppleDevice() {
    return navigator.userAgent.match(/(iPhone|iPod|iPad)/) != null;
}

function adaptForIos(timeStamp) {
    // if (!isAppleDevice()) {
    //     return timeStamp;
    // }

    console.log('newTimeStamp', timeStamp.replace(/-/g, '/'));

    return timeStamp.replace(/-/g, '/');
}