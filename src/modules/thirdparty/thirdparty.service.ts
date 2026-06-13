import { Injectable } from '@nestjs/common';
import { CreateThirdPartyDto } from './dto/create-thirdparty.dto';

@Injectable()
export class ThirdpartyService {
  createUser(payload: CreateThirdPartyDto) {
    const id = Date.now().toString();
    return { id, ...payload, createdAt: new Date().toISOString() };
  }

  carInsurance() {
    return {
      policy_info: {
        insurance_company: 'ABC Auto Insurance Ltd.',
        policy_number: 'AI-2026-458921',
        policy_type: 'Comprehensive Car Insurance',
        effective_date: '2026-01-01',
        expiration_date: '2026-12-31',
      },
      policyholder: {
        name: 'John Smith',
        address: '245 Green Street, Austin, TX, USA',
        phone: '+1 555 123 4567',
        email: 'john.smith@email.com',
      },
      vehicle: {
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        color: 'Silver',
        vin: '1HGCM82633A123456',
        license_plate: 'TX-7845-KL',
      },
      coverage: {
        liability: {
          per_person: 100000,
          per_accident: 300000,
        },
        collision: 'Included',
        comprehensive: 'Included',
        uninsured_motorist: 50000,
      },
      financials: {
        annual_premium: 1200.0,
        payment_plan: 'Monthly',
        monthly_payment: 100.0,
        deductibles: {
          collision: 500,
          comprehensive: 500,
        },
      },
      exclusions: [
        'Intentional damage caused by the insured',
        'Driving under the influence of alcohol or drugs',
        'Commercial use unless stated in the policy',
        'Mechanical breakdown not related to an accident',
      ],
    };
  }

  health() {
    return { status: 'ok' };
  }
}
