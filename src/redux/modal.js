import * as ActionTypes from './ActionTypes';

export const ModalForm = (
  state = {
    isModalOpen: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_MODAL:
      return { ...state, isModalOpen: !state.isModalOpen };

    default:
      return state;
  }
};
