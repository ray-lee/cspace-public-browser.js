import Immutable from 'immutable';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};
