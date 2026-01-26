import { Agent } from '../model/types';
import { shortName } from './short-name';

export const convertUsersForSelect = (agents: Agent[]) => {
  return agents.map((agent) => {
    return { id: agent.id, label: shortName(agent), name: shortName(agent) };
  });
};
