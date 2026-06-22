import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // 1. Load file .env biến nó thành Global để dùng ở mọi nơi
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Cấu hình TypeORM kết nối Database bất đồng bộ
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // Đọc url từ file env
        url: configService.get<string>('DATABASE_URL'),
        // True thì TypeORM sẽ tự tạo bảng (Chỉ nên dùng lúc code ở môi trường Dev)
        autoLoadEntities: true,
        synchronize: true,
        logging: true, // BẬT LOG: TypeORM sẽ in toàn bộ câu lệnh SQL ra terminal
        ssl: {
          rejectUnauthorized: false // Bắt buộc phải có khi kết nối Supabase
        }
      })
    }),
    AuthModule,
    TodosModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
