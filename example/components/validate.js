export const validate = function(type, value) {
  const charOnly = /^[a-zA-ZÀ-ÿ ]+$/;

  if (value.length === 0) {
    return 'formatMessage(messages.botValidationEmpty)';
  }

  switch (type) {
    default:
    case 'vorname':
    case 'nachname':
      if (!charOnly.test(value)) {
        return 'messages botValidationError';
        // return `${value}? Nicht wirklich, oder?`;
      }
      break;
    case 'geburtstag':
      // Info: Nur Datum vor 01.01.2002 möglich
      const maxDate = new Date(Date.UTC(2002, 0, 1));

      var dateStr = value.split('.');
      const geburtstag = new Date(Date.UTC(dateStr[2], dateStr[1] - 1, dateStr[0]));
      if (geburtstag.getDate() == dateStr[0] && geburtstag.getMonth() + 1 == dateStr[1] && geburtstag.getFullYear() == dateStr[2]) {
        if (maxDate && geburtstag >= maxDate) {
          return 'formatMessage(messages.botValidationDateTooYoung)';
        }
        return true;
      } else {
        return 'formatMessage(messages.botValidationDateFormat)';
      }
      break;
    case 'ausbildungsDatum':
      // Info: Nur in der Zukunft
      const minDateAsTimestamp = Date.now();

      var dateStr = value.split('.');
      const ausbildungsDatum = new Date(Date.UTC(dateStr[2], dateStr[1] - 1, dateStr[0]));
      if (ausbildungsDatum.getDate() == dateStr[0] && ausbildungsDatum.getMonth() + 1 == dateStr[1] && ausbildungsDatum.getFullYear() == dateStr[2]) {
        if (minDateAsTimestamp && ausbildungsDatum.getTime() <= minDateAsTimestamp) {
          return "formatMessage(messages.botValidationDateMustBeInFuture)";
        }
        return true;
      } else {
        return "formatMessage(messages.botValidationDateFormat)";
      }
      break;
    case 'mobilenummer':
      const numberClean = value.trim().replace(/[\s]/g, "");
      const telRegex = /^[0-9]{10}$|^[0-9]{13}$|^\+[0-9]{11}$/;
      if (!telRegex.test(numberClean)) {
        return "formatMessage(messages.botValidationTelFormat)";
      }
      break;
    case 'email':
      const emailClean = value.trim().replace(/[\s]/g, "");
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(String(emailClean).toLowerCase())) {
        return "formatMessage(messages.botValidationEmailFormat)";
      }
      break;
  }
  return true;
}