import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {RegistroPago, RegistroPagoRelations} from '../models';

export class RegistroPagoRepository extends DefaultCrudRepository<
  RegistroPago,
  typeof RegistroPago.prototype.fechaPago,
  RegistroPagoRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(RegistroPago, dataSource);
  }
}
