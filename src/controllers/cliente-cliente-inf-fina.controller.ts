import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  ClienteInfFina,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteClienteInfFinaController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/cliente-inf-fina', {
    responses: {
      '200': {
        description: 'ClienteInfFina belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ClienteInfFina)},
          },
        },
      },
    },
  })
  async getClienteInfFina(
    @param.path.number('id') id: typeof Cliente.prototype.documento,
  ): Promise<ClienteInfFina> {
    return this.clienteRepository.clienteInfFina(id);
  }
}
