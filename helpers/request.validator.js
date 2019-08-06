/**
 * Validates the JSONRequest for mandatory parameters
 * Checks for name and phone number or emailAddress
 */
function createContactValidator(jsonRequest) {
  let isRequestValid = true;
  if (!jsonRequest.name || (!jsonRequest.phone && !jsonRequest.email)) {
    isRequestValid = false;
    return isRequestValid;
  }
  return isRequestValid;
}
module.exports = {
  createContactValidator: createContactValidator
};
