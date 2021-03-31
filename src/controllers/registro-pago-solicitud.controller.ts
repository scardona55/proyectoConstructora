import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RegistroPago,
  Solicitud,
} from '../models';
import {RegistroPagoRepository} from '../repositories';

export class RegistroPagoSolicitudController {
  constructor(
    @repository(RegistroPagoRepository)
    public registroPagoRepository: RegistroPagoRepository,
  ) { }

  @get('/registro-pagos/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to RegistroPago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.string('id') id: typeof RegistroPago.prototype.fechaPago,
  ): Promise<Solicitud> {
    return this.registroPagoRepository.solicitud(id);
  }
}
