import DB from '@databases';
import { CreateTypeDto } from '@dtos/types.dto';
import { HttpException } from '@exceptions/HttpException';
import { Type } from '@/models/types/interface/types.interface';
import { isEmpty } from '@utils/util';

class TypeService {
  public Types = DB.Types;

  public async findAllType(): Promise<Type[]> {
    const allType: Type[] = await this.Types.findAll();
    return allType;
  }

  public async findTypeById(typeId: number): Promise<Type> {
    if (isEmpty(typeId)) throw new HttpException(400, "You're not typeId");

    const findType: Type = await this.Types.findByPk(typeId);
    if (!findType) throw new HttpException(409, "You're not Type");

    return findType;
  }

  public async createType(typeData: CreateTypeDto): Promise<Type> {
    if (isEmpty(typeData)) throw new HttpException(400, "You're not typeData");
    const createTypeData: Type = await this.Types.create({ ...typeData});
    return createTypeData;
  }

  public async updateType(typeId: number, typeData: CreateTypeDto): Promise<Type> {
    if (isEmpty(typeData)) throw new HttpException(400, "You're not typeData");

    const findType: Type = await this.Types.findByPk(typeId);
    if (!findType) throw new HttpException(409, "You're not a Type");
    await this.Types.update({ ...typeData}, { where: { id: typeId } });

    const updateType: Type = await this.Types.findByPk(typeId);
    return updateType;
  }

  public async deleteType(typeId: number): Promise<Type> {
    if (isEmpty(typeId)) throw new HttpException(400, "You're not typeId");

    const findType: Type = await this.Types.findByPk(typeId);
    if (!findType) throw new HttpException(409, "You're not a Type");

    await this.Types.destroy({ where: { id: typeId } });

    return findType;
  }
}

export default TypeService;
