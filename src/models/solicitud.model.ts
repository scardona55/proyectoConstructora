import {Entity, model, property} from '@loopback/repository';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @property({
    type: 'number',
    required: true,
  })
  ofertaEconomica: number;

  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  inmuebleSolici: number;

  @property({
    type: 'string',
    required: true,
  })
  clienteSolici: string;

  @property({
    type: 'string',
    required: true,
  })
  soliciPendien: string;


  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
