import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Bloque, Solicitud} from '../models';
import {BloqueRepository} from './bloque.repository';
import {SolicitudRepository} from './solicitud.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.codigo,
  InmuebleRelations
> {

  public readonly bloque: BelongsToAccessor<Bloque, typeof Inmueble.prototype.codigo>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Inmueble.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Inmueble, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.bloque = this.createBelongsToAccessorFor('bloque', bloqueRepositoryGetter,);
    this.registerInclusionResolver('bloque', this.bloque.inclusionResolver);
  }
}
