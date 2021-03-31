import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {ClienteInfFina} from './cliente-inf-fina.model';
import {Solicitud} from './solicitud.model';
import {Ciudad} from './ciudad.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  documento: number;

  @property({
    type: 'string',
    required: true,
  })
  primer_nombre: string;

  @property({
    type: 'string',
  })
  segundo_nombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_apellido: string;

  @property({
    type: 'string',
  })
  segundo_apellido?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  fotografia: string;

  @property({
    type: 'number',
    required: true,
  })
  celular: number;

  @property({
    type: 'string',
    required: true,
  })
  correo_electronico: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @belongsTo(() => ClienteInfFina)
  clienteInfFinaId: number;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @belongsTo(() => Ciudad)
  ciudadId: number;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
