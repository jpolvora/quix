import { AccountTypes } from '@/domain/use-cases'

const poupancaEnabled = {
  id: '111994c7-81e7-4614-ad1f-9bb927751e13',
  account_type: AccountTypes.Poupança,
  enabled: true,
}

const poupancaDisabled = {
  id: '52bca67c-e99e-495f-b372-2bcf8e1db815',
  account_type: AccountTypes.Poupança,
  enabled: false,
}

const correnteEnabled = {
  id: '910481f2-66cc-4bed-a366-cd21f69bd61b',
  account_type: AccountTypes.Corrente,
  enabled: true,
}

const correnteDisabled = {
  id: '0cd5a079-7c34-4b0f-8027-fcbc89d9e9c8',
  account_type: AccountTypes.Corrente,
  enabled: false,
}

const accountToCreateAndVerify = {
  id: 'f32b3ce1-516d-41e3-8c2a-8721ecf07738',
  account_type: AccountTypes.Corrente,
  enabled: false,
}

export { poupancaEnabled, poupancaDisabled, correnteDisabled, correnteEnabled, accountToCreateAndVerify }
