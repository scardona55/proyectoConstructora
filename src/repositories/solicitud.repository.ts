import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Cliente, RegistroPago, Inmueble} from '../models';
import {ClienteRepository} from './cliente.repository';
import {RegistroPagoRepository} from './registro-pago.repository';
import {InmuebleRepository} from './inmueble.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.inmuebleSolici,
  SolicitudRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Solicitud.prototype.inmuebleSolici>;

  public readonly registroPagos: HasManyRepositoryFactory<RegistroPago, typeof Solicitud.prototype.inmuebleSolici>;

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof Solicitud.prototype.inmuebleSolici>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('RegistroPagoRepository') protected registroPagoRepositoryGetter: Getter<RegistroPagoRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Solicitud, dataSource);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
    this.registroPagos = this.createHasManyRepositoryFactoryFor('registroPagos', registroPagoRepositoryGetter,);
    this.registerInclusionResolver('registroPagos', this.registroPagos.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
