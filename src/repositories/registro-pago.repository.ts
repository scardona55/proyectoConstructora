import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {RegistroPago, RegistroPagoRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class RegistroPagoRepository extends DefaultCrudRepository<
  RegistroPago,
  typeof RegistroPago.prototype.fechaPago,
  RegistroPagoRelations
> {

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof RegistroPago.prototype.fechaPago>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(RegistroPago, dataSource);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
