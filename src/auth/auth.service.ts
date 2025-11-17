import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { genSaltSync, hashSync, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private userModel: ReturnModelType<typeof UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(email: string, password: string): Promise<UserModel> {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const newUser = new this.userModel({
      email,
      passwordHash: hashedPassword,
    });
    return newUser.save();
  }

  async findUser(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');
    const isPasswordValid = await compare(password, user.passwordHash);
    if (!isPasswordValid) throw new UnauthorizedException('Wrong password');
    return { email: user.email };
  }

  async login(email: string) {
    return { access: await this.jwtService.signAsync({ email }) };
  }
}
