import { createAction } from 'redux-actions';

export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const updateToken = createAction(UPDATE_TOKEN);

export const UPDATE_TIME = 'UPDATE_TIME';
export const updateTime = createAction(UPDATE_TIME);

export const CONFIRM_TRAVEL = 'CONFIRM_TRAVEL';
export const confirmTravel = createAction(CONFIRM_TRAVEL);
