import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {ClienteInfFina, ClienteInfFinaRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class ClienteInfFinaRepository extends DefaultCrudRepository<
  ClienteInfFina,
  typeof ClienteInfFina.prototype.totalIngresos,
  ClienteInfFinaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof ClienteInfFina.prototype.totalIngresos>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(ClienteInfFina, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
