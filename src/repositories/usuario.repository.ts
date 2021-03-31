import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbdsDataSource} from '../datasources';
import {Usuario, UsuarioRelations} from '../models';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.Documento,
  UsuarioRelations
> {
  constructor(
    @inject('datasources.mongodbds') dataSource: MongodbdsDataSource,
  ) {
    super(Usuario, dataSource);
  }
}
