import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class RegistroPago extends Entity {
  @property({
    type: 'date',
    id: true,
    generated: true,
  })
  fechaPago?: string;

  @property({
    type: 'number',
    required: true,
  })
  aporte: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RegistroPago>) {
    super(data);
  }
}

export interface RegistroPagoRelations {
  // describe navigational properties here
}

export type RegistroPagoWithRelations = RegistroPago & RegistroPagoRelations;
