
export class CreateUserDto {
  readonly firstname?: string;
  readonly lastname?: string;
  readonly email: string;
  readonly password: string;
  readonly gender?: string;
  readonly avatar?: string;
  readonly birthday?: string;
}
