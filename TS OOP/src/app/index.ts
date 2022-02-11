// вы можете редактировать этот файл, но его не нужно рефакторить)

import { DBConnection } from './db-connection';
import { houseCreator, HouseBuilder } from './house-creator';
//import { House } from './entities/house';

// --------- user1 --------- //

async function user1ClientFlow() {
  const connection = new DBConnection('localhost', 'root', '1111', 'prod');

  const house1 = houseCreator.createClassicHouse(2);
  const house2 = houseCreator.createModernHouse(4);

  await connection.save(house1);
  await connection.save(house2);

  console.log(`user1 house1`, house1);
  console.log(`user1 house2`, house2);
}

// --------- user2 --------- //

async function user2ClientFlow() {
  const connection = new DBConnection('localhost', 'root', '1111', 'prod');

  const house1 = houseCreator.createNeoHouse(1);

  // custom
  const house2 = houseCreator.createCustomHouse(
    {count: 2, size: 30, style: 'modern'},
    {size: 60, style: 'neo'}
  );
  house2.paint('blue');
  house2.addFloor();
  house2.addFloor();
  house2.addFloor();

  const house3 = houseCreator.createClassicHouse(3);

  await connection.save(house1);
  await connection.save(house2);
  await connection.save(house3);

  console.log(`user2 house1`, house1);
  console.log(`user2 house2`, house2);
  console.log(`user2 house3`, house3);
}


user1ClientFlow().then(() => {
  console.log('//--------------------//');
  user2ClientFlow();
});



