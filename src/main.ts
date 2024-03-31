import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
<<<<<<< HEAD
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
      secure: false,
    }
    }),
    );
=======
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false, 
      }
    }),
  );
  app.enableCors();
  
  
>>>>>>> 6a6d74043919e4860e5e0ae2a09ebfbcd2acef59
  await app.listen(3000);
}

bootstrap();
