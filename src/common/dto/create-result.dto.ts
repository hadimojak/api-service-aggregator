import { UUID } from 'crypto';

export interface ModifyResultDto {
  result: { id: string };
  message: string;
}
