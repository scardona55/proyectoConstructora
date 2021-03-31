import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ClienteInfFina,
  Cliente,
} from '../models';
import {ClienteInfFinaRepository} from '../repositories';

export class ClienteInfFinaClienteController {
  constructor(
    @repository(ClienteInfFinaRepository)
    public clienteInfFinaRepository: ClienteInfFinaRepository,
  ) { }

  @get('/cliente-inf-finas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to ClienteInfFina',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof ClienteInfFina.prototype.totalIngresos,
  ): Promise<Cliente> {
    return this.clienteInfFinaRepository.cliente(id);
  }
}
