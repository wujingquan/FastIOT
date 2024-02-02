import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'pid不能为空' })
  pid: number;

  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;

  @IsNotEmpty({ message: '角色ID不能为空' })
  role_id: number;
}
