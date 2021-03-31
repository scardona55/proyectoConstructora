import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class ClienteInfFina extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  totalIngresos: number;

  @property({
    type: 'number',
    required: true,
  })
  telefonoTrabajo: number;

  @property({
    type: 'string',
    required: true,
  })
  nomTrabajo: string;

  @property({
    type: 'number',
    required: true,
  })
  tiempoTrab: number;

  @property({
    type: 'string',
    required: true,
  })
  refFamiliar: string;

  @property({
    type: 'number',
    required: true,
  })
  telRefP: number;

  @property({
    type: 'string',
    required: true,
  })
  refLaboral: string;

  @property({
    type: 'number',
    required: true,
  })
  telRefL: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<ClienteInfFina>) {
    super(data);
  }
}

export interface ClienteInfFinaRelations {
  // describe navigational properties here
}

export type ClienteInfFinaWithRelations = ClienteInfFina & ClienteInfFinaRelations;
