import { UUID } from 'crypto';

export interface ModifyResultDto {
  result: { id: UUID };
  message: string;
}
