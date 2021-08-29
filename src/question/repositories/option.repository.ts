import {EntityRepository, Repository} from "typeorm";
import {OptionEntity} from "../entities/option.entity";
@EntityRepository(OptionEntity)
export class OptionRepository extends Repository<OptionEntity> {}
