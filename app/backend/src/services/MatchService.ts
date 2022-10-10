import IMatchService from '../interfaces/IMatchService';
import MatchModel from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

export default class MatchService implements IMatchService {
  private db = MatchModel;

  async findAll(query: string | undefined): Promise<MatchModel[]> {
    if (!query) {
      const matches = await this.db.findAll({ include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
      return matches;
    }
    const queryNumber = query === 'true';
    const matches = await this.db.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
    where: { inProgress: queryNumber },
    });
    return matches;
  }
}