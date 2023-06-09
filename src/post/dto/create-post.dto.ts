import { TCategoryValue } from '../types';

export class CreatePostDto {
  title: string;
  content: number;
  totalPrice: number;
  status?: string;

  categoryName: TCategoryValue;
  type: string;
  nameOfBuilding: string;
  address: string;
  codeOfBuilding: string;
  block: string;
  floor: number;
  typeOfBuilding: string;
  numberOfBedroom: number;
  numberOfBathroom: number;
  balconnyDirection: string;
  doorDirection: string;
  interiorCondition: string;
  juridical: string;
  area: number;
  numberOfKM: number;
  statusCar: string;
  color: string;
  numberOfSeats: number;
  fuel: string;
  carGearbox: string;
  yearOfManufacture: number;
  brand: string;
  guarantee: string;
  statusBicycle: string;
  typeBicycle: string;
  engine: string;
  width: number;
  height: number;
  groundDirection: string;
  typeGround: string;
  numberOfFloor: Number;
  typeHouse: string;
  codeHouse: string;
  graphicsCard: string;
  typeHardWare: string;
  hardWare: string;
  ram: string;
  statusLaptop: string;
  microProcessor: string;
  deposit: number;
  statusMotorbike: string;
  capacity: string;
  typeMotorbike: string;
  typeOffice: string;
  statusPhone: string;

  isAdmin?: boolean;
}
