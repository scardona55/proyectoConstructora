import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Solicitud,
  RegistroPago,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudRegistroPagoController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/registro-pagos', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many RegistroPago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RegistroPago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RegistroPago>,
  ): Promise<RegistroPago[]> {
    return this.solicitudRepository.registroPagos(id).find(filter);
  }

  @post('/solicituds/{id}/registro-pagos', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(RegistroPago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.inmuebleSolici,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroPago, {
            title: 'NewRegistroPagoInSolicitud',
            exclude: ['fechaPago'],
            optional: ['solicitudId']
          }),
        },
      },
    }) registroPago: Omit<RegistroPago, 'fechaPago'>,
  ): Promise<RegistroPago> {
    return this.solicitudRepository.registroPagos(id).create(registroPago);
  }

  @patch('/solicituds/{id}/registro-pagos', {
    responses: {
      '200': {
        description: 'Solicitud.RegistroPago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroPago, {partial: true}),
        },
      },
    })
    registroPago: Partial<RegistroPago>,
    @param.query.object('where', getWhereSchemaFor(RegistroPago)) where?: Where<RegistroPago>,
  ): Promise<Count> {
    return this.solicitudRepository.registroPagos(id).patch(registroPago, where);
  }

  @del('/solicituds/{id}/registro-pagos', {
    responses: {
      '200': {
        description: 'Solicitud.RegistroPago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RegistroPago)) where?: Where<RegistroPago>,
  ): Promise<Count> {
    return this.solicitudRepository.registroPagos(id).delete(where);
  }
}
