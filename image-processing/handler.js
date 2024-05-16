'use strict'

module.exports = async (event, context) => {
  // test aanpassing
  console.debug(context);
  return context
    .status(200)
    .succeed(event.body);
}
