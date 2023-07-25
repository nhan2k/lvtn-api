import { TCategoryValue } from '../types';

export const transformKeyToEng = (categoryName: TCategoryValue) => {
  switch (categoryName) {
    case 'Chung cư':
      return 'apartmentPostId';
    case 'Xe hơi':
      return 'carPostId';
    case 'Xe điện':
      return 'electricBicyclePostId';
    case 'Đất':
      return 'groundPostId';
    case 'Nhà ở':
      return 'housePostId';
    case 'Laptop':
      return 'laptopPostId';
    case 'Phòng trọ':
      return 'motelRoomPostId';
    case 'Xe máy':
      return 'motorbikePostId';
    case 'Văn phòng':
      return 'officePostId';
    case 'Điện thoại':
      return 'phonePostId';
  }
};
