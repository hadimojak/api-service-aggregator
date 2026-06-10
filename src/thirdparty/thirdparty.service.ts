import { Injectable } from '@nestjs/common';
import { CreateThirdPartyDto } from './dto/create-thirdparty.dto';

@Injectable()
export class ThirdpartyService {
  create(payload: CreateThirdPartyDto) {
    const id = Date.now().toString();
    return { id, ...payload, createdAt: new Date().toISOString() };
  }

  health() {
    return { status: 'ok' };
  }
}
