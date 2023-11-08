window.addEventListener(
  'DOMContentLoaded',
  () => {
    const IS_PROD = true
    const MESSAGE_ERROR =
      'Estamos enfrentando problemas de conexão, por favor, tente novamente em alguns minutos'

    const SAS_URL = IS_PROD
      ? 'https://api.pr.sebrae.com.br/sas-api/'
      : 'https://apihml.pr.sebrae.com.br/sas-api/'
    const ONETRUST_URL = 'https://privacyportal-br.onetrust.com/'
    const CADASTRO_API = `${SAS_URL}public/realizar-cadastro/completo`
    const LOGIN_API = `${SAS_URL}public/login`
    const ONETRUST_API = `${ONETRUST_URL}request/v1/consentreceipts`

    const objConsent = {
      identifier: undefined,
      requestInformation:
        'eyJhbGciOiJSUzUxMiJ9.eyJvdEp3dFZlcnNpb24iOjEsInByb2Nlc3NJZCI6IjVjMTdiYWJjLTJkYjktNGVkMC04OTY1LWRmM2FiZjRhZTg0MCIsInByb2Nlc3NWZXJzaW9uIjoxLCJpYXQiOiIyMDIzLTA4LTAzVDE0OjA2OjU3LjE2NyIsIm1vYyI6IkFQSSIsInBvbGljeV91cmkiOm51bGwsInN1YiI6IkNQRiIsImlzcyI6bnVsbCwidGVuYW50SWQiOiIxZTMzMjIwZi1iODA1LTRhOGItOTczZi02YjkwZThiZTgzOGYiLCJkZXNjcmlwdGlvbiI6IlNlciB1bWEgZm9udGUgZGUgaW5mb3JtYcOnw7VlcyBlIHJlY3Vyc29zIHBhcmEgZW1wcmVlbmRlZG9yZXMsIG1pY3JvIGUgcGVxdWVuYXMgZW1wcmVzYXMgZG8gZXN0YWRvIGRvIFBhcmFuw6EuIE8gcG9ydGFsIG9mZXJlY2UgY29udGXDumRvcyBzb2JyZSBnZXN0w6NvIGVtcHJlc2FyaWFsLCBjYXBhY2l0YcOnw7Vlcywgbm90w61jaWFzLCBpbmZvcm1hw6fDtWVzIHNvYnJlIGV2ZW50b3MgZSBwcm9ncmFtYXMgZGUgYXBvaW8gZGlzcG9uw612ZWlzLCBjb21vIGNvbnN1bHRvcmlhcywgbWVudG9yaWFzLCBhY2Vzc28gYSBjcsOpZGl0byBlIHBhcmNlcmlhcy4gTyBvYmpldGl2byDDqSBkaXNwb25pYmlsaXphciB1bSBlc3Bhw6dvIHZpcnR1YWwgcXVlIGF1eGlsaWUgb3MgZW1wcmVlbmRlZG9yZXMgYSB0b21hciBkZWNpc8O1ZXMgbWFpcyBhc3NlcnRpdmFzLCBhZHF1aXJpciBjb25oZWNpbWVudG9zIGUgaGFiaWxpZGFkZXMgZXNzZW5jaWFpcyBwYXJhIG8gc3VjZXNzbyBkb3Mgc2V1cyBuZWfDs2Npb3MuIEFsw6kiLCJjb25zZW50VHlwZSI6IkNPTkRJVElPTkFMVFJJR0dFUiIsImFsbG93Tm90R2l2ZW5Db25zZW50cyI6ZmFsc2UsImRvdWJsZU9wdEluIjpmYWxzZSwicHVycG9zZXMiOlt7ImlkIjoiMTMxMmQ1NjUtYTM3Zi00N2VmLWFmNWQtMGQxNjFkZDdlMDYzIiwidmVyc2lvbiI6MiwicGFyZW50SWQiOm51bGwsInRvcGljcyI6W10sImN1c3RvbVByZWZlcmVuY2VzIjpbXSwiZW5hYmxlR2VvbG9jYXRpb24iOmZhbHNlfSx7ImlkIjoiMTNiZmIxMTktYmI0Yy00NDEyLTk3ZTItODA5MzI5OTI3YTkwIiwidmVyc2lvbiI6MSwicGFyZW50SWQiOm51bGwsInRvcGljcyI6W10sImN1c3RvbVByZWZlcmVuY2VzIjpbXSwiZW5hYmxlR2VvbG9jYXRpb24iOmZhbHNlfSx7ImlkIjoiNWU2NDM0MDQtNGVlNi00NTQ3LWFmNWItZjE1MjcyMWIxZmYwIiwidmVyc2lvbiI6MiwicGFyZW50SWQiOm51bGwsInRvcGljcyI6W10sImN1c3RvbVByZWZlcmVuY2VzIjpbXSwiZW5hYmxlR2VvbG9jYXRpb24iOmZhbHNlfV0sIm5vdGljZXMiOltdLCJkc0RhdGFFbGVtZW50cyI6WyJFbWFpbCIsIk5hbWUiXSwiYXV0aGVudGljYXRpb25SZXF1aXJlZCI6ZmFsc2UsInJlY29uZmlybUFjdGl2ZVB1cnBvc2UiOmZhbHNlLCJvdmVycmlkZUFjdGl2ZVB1cnBvc2UiOnRydWUsImR5bmFtaWNDb2xsZWN0aW9uUG9pbnQiOmZhbHNlLCJhZGRpdGlvbmFsSWRlbnRpZmllcnMiOlsiRW1haWwiXSwibXVsdGlwbGVJZGVudGlmaWVyVHlwZXMiOmZhbHNlLCJlbmFibGVQYXJlbnRQcmltYXJ5SWRlbnRpZmllcnMiOmZhbHNlLCJwYXJlbnRQcmltYXJ5SWRlbnRpZmllcnNUeXBlIjpudWxsLCJhZGRpdGlvbmFsUGFyZW50SWRlbnRpZmllclR5cGVzIjpbXSwiZW5hYmxlR2VvbG9jYXRpb24iOmZhbHNlfQ.E-S7hb0gHLrVynDTFqIzOb0E_-Na0TIh7-gCElzaa2P5tuUJaafCjUzQhM1Ff0HmOOahAdFYB4k8NFD3Ymq1tYggGo9Z0t4wQXw3yoamsGrzwYg1yFZ0rOrIXqDIZZvkO7eodc4YRndgQKYMdW3suzMRAqoixSYOw_IT4ovh_X0gtFXAsErn74sGPVBCVk2VHK41Y8EsQ-My2GLp0VJLSAXpoAwJVEZ0LUqMJseE0nyeh6ipnpNbSYBkug_QjLCJTD2M63NdZiZrbBCmBzpo5bVjXZQfo7M3tXnoGLIs4wZgog32bDFneZlPUiEpNVYOaY_bi8HbiNKqLeXfDU5cCBOD-tso85Pg50hiByCsW7pyNbQVU_R4kVZ6d6CiDbJKX7LCp-pGuNS2aIQzzNnrAwYoUOq12q-zw4isC44Q-gbeBKBmo2ojLR7T7A5xCONUU-WzGgsobwUuCnThLOCfEsp7hzXNdcgVQJK3D0pAKID0X_evwJHc5_kGrOwPBksoAFy6UHLdYUTAPAxpMwkU4PHxop1UFB8AGMgk_WRoI4xIkjHFpTbAvmqEPoXOVRahR9IECvTnmOxO64G_Sa7mjKE3e8yW25VuLAvW7Y9TO6gNgCnyMQ9ReTijcQbCss_AZIn5HZQ24e6wWk1xLXXCP4DXSwDbm5IEulGGQzGO3ts',
      purposes: [
        {
          Id: '1312d565-a37f-47ef-af5d-0d161dd7e063',
          TransactionType: 'CONFIRMED',
        },
        {
          Id: '13bfb119-bb4c-4412-97e2-809329927a90',
          TransactionType: 'CONFIRMED',
        },
        {
          Id: '5e643404-4ee6-4547-af5b-f152721b1ff0',
          TransactionType: 'CONFIRMED',
        },
      ],
      test: !IS_PROD,
      dsDataElements: {
        Email: undefined,
        Name: undefined,
      },
    }

    const objSebrae = {
      cpf: undefined,
      nome: undefined,
      email: undefined,
      sexo: undefined,
      dataNascimento: undefined,
      enviaEmailConfirm: false,
      senha: undefined,
      confSenha: undefined,
      telefone: undefined,
      cep: undefined,
      numero: undefined,
      local: undefined,
      bairro: undefined,
      logradouro: undefined,
      estado: undefined,
      enderecoComplemento: undefined,
      enderecoNumero: undefined,
      contentAndPromotions: undefined,
    }

    // Inserção do HTML de consentimentos
    const submitButton = document.getElementsByClassName('buttons-login')[1]

    const htmlPrivacyPolicy =
      '<div class="clear-left" style="margin-left: 15px">' +
      '<label>' +
      '<input id="privacyPolicy" type="checkbox" required style="-webkit-appearance: auto;">' +
      '<span style="margin-left: 5px;">' +
      'Declaro que li e estou ciente que os meus dados serão tratados conforme as diretrizes da ' +
      '<a style="position: inherit;display: contents;text-decoration: underline !important; color: blue" href="https://minio-cpe.sebrae.com.br/documento/politica-privacidade.pdf" target="_blank">Politica de Privacidade do Sebrae</a>' +
      '</span>' +
      '</label>' +
      '</div>'

    const htmlTermsOfUse =
      '<div class="clear-left" style="margin-left: 15px">' +
      '<label>' +
      '<input id="termsOfUse" type="checkbox" required style="-webkit-appearance: auto;">' +
      '<span style="margin-left: 5px;">' +
      'Declaro que estou de acordo com o ' +
      '<a style="position: inherit;display: contents;text-decoration: underline !important; color: blue" href="https://minio-cpe.sebrae.com.br/documento/termo-portal-sebrae-nacional.pdf" target="_blank">Termo de Uso</a>' +
      '</span>' +
      '</label>' +
      '</div>'

    const htmlContentAndPromotions =
      '<div class="clear-left" style="margin-left: 15px">' +
      '<label>' +
      '<input id="contentAndPromotions" type="checkbox" style="-webkit-appearance: auto;">' +
      '<span style="margin-left: 5px;">' +
      'Aceito receber conteúdos e promoções do Sebrae PR (opcional)' +
      '</span>' +
      '</label>' +
      '</div>'

    submitButton.insertAdjacentHTML('beforebegin', htmlPrivacyPolicy)
    submitButton.insertAdjacentHTML('beforebegin', htmlTermsOfUse)
    submitButton.insertAdjacentHTML('beforebegin', htmlContentAndPromotions)

    // Evento de verificação dos dados no CEP
    document.getElementsByName('your-cep')[0].addEventListener(
      'focusout',
      () => {
        setTimeout(() => {
          // Rua
          const road = document.getElementsByName('your-log')[0]
          if (road.value) road.disabled = true
          else road.disabled = false

          // Bairro
          const neighborhood = document.getElementsByName('your-bairro')[0]
          if (neighborhood.value) neighborhood.disabled = true
          else neighborhood.disabled = false
        }, 1000)
      },
      false
    )

    // Evento de cadastro
    const form = document.getElementsByClassName('form-cadastro-cadastrar')
    form[0].addEventListener(
      'submit',
      async (event) => {
        event.preventDefault()
        event.stopImmediatePropagation()
        // Adicionar loading no botão
        const registerButton = document.getElementById('btnWPModalCadastrar')
        registerButton.disabled = true // Desabilitando botão
        const spinnerHTML =
          '<div id="spinnerLogin" style="position: absolute; left: 100%; z-index: 1; margin: -10px -30px 0px -80px; border-width: 3px; border-style: solid; border-color: rgb(52, 152, 219) rgb(243, 243, 243) rgb(243, 243, 243); border-image: initial; border-radius: 50%; width: 20px; height: 20px; animation: 2s linear 0s infinite normal none running spin;"></div>'
        registerButton.innerHTML = spinnerHTML

        // Recuperando informações do formulário
        const data = [...new FormData(event.target).entries()]
        data.forEach((element) => {
          const key = element[0]
          const value = element[1]
          switch (key) {
            case 'your-cpf-cad':
              objSebrae.cpf = String(value)
                .replace('.', '')
                .replace('.', '')
                .replace('-', '')
              objConsent.identifier = value
              break
            case 'your-name':
              objSebrae.nome = value
              break
            case 'your-email':
              objSebrae.email = value
              break
            case 'your-date':
              let partesData = value.split('/')
              objSebrae.dataNascimento = `${partesData[2]}-${partesData[1]}-${partesData[0]}`
              break
            case 'your-phone':
              objSebrae.telefone = value
                .replace('(', '')
                .replace(')', '')
                .replace(' ', '')
                .replace('-', '')
              break
            case 'your-cep':
              objSebrae.cep = value.replace('-', '')
              break
            case 'your-numero':
              objSebrae.numero = value
              objSebrae.enderecoNumero = value
              break
            case 'your-complemento':
              objSebrae.enderecoComplemento = value
              break
            case 'your-password':
              objSebrae.senha = value
              break
            case 'your-conf-password':
              objSebrae.confSenha = value
              break
            default:
              break
          }
        })

        // Cidade
        const city = document.getElementsByName('your-city')[0]
        objSebrae.local = city.value

        // Estado
        const state = document.getElementsByName('your-state')[0]
        objSebrae.estado = state.value

        // Rua
        const road = document.getElementsByName('your-log')[0]
        objSebrae.logradouro = road.value

        // Bairro
        const neighborhood = document.getElementsByName('your-bairro')[0]
        objSebrae.bairro = neighborhood.value

        // Sexo
        const sex = document.getElementsByName('your-sexo')[0]
        objSebrae.sexo = sex.value

        // Conteúdos e promoções
        const contentAndPromotions = document.getElementById(
          'contentAndPromotions'
        )
        objSebrae.contentAndPromotions = contentAndPromotions.checked

        objConsent.dsDataElements.Email = objSebrae.email
        objConsent.dsDataElements.Name = objSebrae.nome

        // Enviando dados para OneTrust
        await fetch(ONETRUST_API, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(objConsent),
        })

        // Verificação de campos obrigatórios com valor default
        if (!objSebrae.logradouro) objSebrae.logradouro = 'INEXISTENTE'
        if (!objSebrae.bairro) objSebrae.bairro = 'INEXISTENTE'

        // Enviando dados para o SAS
        const responseSAS = await fetch(CADASTRO_API, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(objSebrae),
        })

        if (responseSAS.status != 200) {
          alert(MESSAGE_ERROR)
          return
        }

        // Logando o usuário no PORTAL
        const responseLogin = await fetch(
          LOGIN_API +
            `?login=${objSebrae.cpf}&senha=${objSebrae.senha}&requestedURL=http://www.sebraepr.com.br`,
          {
            headers: {
              'Content-Type': 'application/json',
              App_key: 'e1db40a6-8e0a-4054-836d-0deb2d0fb75c',
            },
            method: 'POST',
          }
        )

        if (responseLogin.status != 200) {
          alert(MESSAGE_ERROR)
          return
        }

        // Atualizando localStorage com os dados do usuário
        const body = await responseLogin.json()
        const token = body.id
        const userName = objSebrae.nome
        localStorage.setItem('token', token)
        localStorage.setItem('usuario-nome', userName)
        document.cookie = `token=${token}`
        location.reload()

        registerButton.innerHTML = 'CADASTRAR'
        registerButton.disabled = false
      },
      true
    )
  },
  false
)
