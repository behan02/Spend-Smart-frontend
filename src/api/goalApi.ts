import axios from 'axios';

const API_URL = 'http://localhost:7211/api/goals';

export const getGoals = () => axios.get(API_URL);
export const createGoal = (goal: any) => axios.post(API_URL, goal);
export const updateGoal = (id: number, goal: any) => axios.put(`${API_URL}/${id}`, goal);
export const deleteGoal = (id: number) => axios.delete(`${API_URL}/${id}`);


