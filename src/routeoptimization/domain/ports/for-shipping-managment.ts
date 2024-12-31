import { Shipping } from 'src/shippings/domain/models/Shipping'; // Según entiendo, esto está bien porque este puerto sí se va a comunicar con otro hexagono

export abstract class ForShippingManagment {
  abstract getShippings(): Promise<Shipping[]>;
  abstract getShippingByIds(ids: string[]): Promise<Shipping[]>;
}
