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
  Cliente,
  Solicitud,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteSolicitudController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.clienteRepository.solicitudes(id).find(filter);
  }

  @post('/clientes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.documento,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInCliente',
            exclude: ['inmuebleSolici'],
            optional: ['clienteId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'inmuebleSolici'>,
  ): Promise<Solicitud> {
    return this.clienteRepository.solicitudes(id).create(solicitud);
  }

  @patch('/clientes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Cliente.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudes(id).patch(solicitud, where);
  }

  @del('/clientes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Cliente.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudes(id).delete(where);
  }
}
