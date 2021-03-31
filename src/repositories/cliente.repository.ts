import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Cliente, ClienteRelations, ClienteInfFina, Solicitud, Ciudad} from '../models';
import {ClienteInfFinaRepository} from './cliente-inf-fina.repository';
import {SolicitudRepository} from './solicitud.repository';
import {CiudadRepository} from './ciudad.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.documento,
  ClienteRelations
> {

  public readonly clienteInfFina: BelongsToAccessor<ClienteInfFina, typeof Cliente.prototype.documento>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Cliente.prototype.documento>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Cliente.prototype.documento>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ClienteInfFinaRepository') protected clienteInfFinaRepositoryGetter: Getter<ClienteInfFinaRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Cliente, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.clienteInfFina = this.createBelongsToAccessorFor('clienteInfFina', clienteInfFinaRepositoryGetter,);
    this.registerInclusionResolver('clienteInfFina', this.clienteInfFina.inclusionResolver);
  }
}
