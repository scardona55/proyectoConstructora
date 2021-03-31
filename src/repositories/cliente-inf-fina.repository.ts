import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {ClienteInfFina, ClienteInfFinaRelations} from '../models';

export class ClienteInfFinaRepository extends DefaultCrudRepository<
  ClienteInfFina,
  typeof ClienteInfFina.prototype.totalIngresos,
  ClienteInfFinaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(ClienteInfFina, dataSource);
  }
}
