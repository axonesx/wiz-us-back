import DB from '@databases';
import { CreateOpinionDto } from '@dtos/opinions.dto';
import { HttpException } from '@exceptions/HttpException';
import { Opinion } from '@/models/opinions/interface/opinions.interface';
import { isEmpty } from '@utils/util';

class Opinionservice {
  public Opinions = DB.Opinions;

  public async findAllOpinion(): Promise<Opinion[]> {
    const allOpinion: Opinion[] = await this.Opinions.findAll();
    return allOpinion;
  }

  public async findOpinionById(opinionId: number): Promise<Opinion> {
    if (isEmpty(opinionId)) throw new HttpException(400, "You're not opinionId");

    const findOpinion: Opinion = await this.Opinions.findByPk(opinionId);
    if (!findOpinion) throw new HttpException(409, "You're not Opinion");

    return findOpinion;
  }

  public async createOpinion(opinionData: CreateOpinionDto): Promise<Opinion> {
    if (isEmpty(opinionData)) throw new HttpException(400, "You're not OpinionData");
    const createOpinionData: Opinion = await this.Opinions.create({ ...opinionData});
    return createOpinionData;
  }

  public async updateOpinion(opinionId: number, opinionData: CreateOpinionDto): Promise<Opinion> {
    if (isEmpty(opinionData)) throw new HttpException(400, "You're not OpinionData");

    const findOpinion: Opinion = await this.Opinions.findByPk(opinionId);
    if (!findOpinion) throw new HttpException(409, "You're not Opinion");
    await this.Opinions.update({ ...opinionData}, { where: { id: opinionId } });

    const updateOpinion: Opinion = await this.Opinions.findByPk(opinionId);
    return updateOpinion;
  }

  public async deleteOpinion(opinionId: number): Promise<Opinion> {
    if (isEmpty(opinionId)) throw new HttpException(400, "You're not opinionId");

    const findOpinion: Opinion = await this.Opinions.findByPk(opinionId);
    if (!findOpinion) throw new HttpException(409, "You're not Opinion");

    await this.Opinions.destroy({ where: { id: opinionId } });

    return findOpinion;
  }
}

export default Opinionservice;
