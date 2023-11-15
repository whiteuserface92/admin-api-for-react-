import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';



@Injectable()
export class AppService {
  
  getConnection() : any{
    const client = new Pool({
      user: 'postgres',
      host: 'localhost',
      password: 'postgres',
      database: 'postgres',
      port: 5432,
      max: 5
    })

    client.connect(err => {
      if (err) {
        console.log('Failed to connect db ' + err)
      } else {
        console.log('Connect to db done!')
      }
    })
    return client;
  }

  async getHello() {

    const client: any = this.getConnection();

    let result : any = await client.query('SELECT * FROM test_table');

  return result
  }
}
