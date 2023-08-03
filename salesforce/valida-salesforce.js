window.addEventListener('DOMContentLoaded', function () {
  const salesforce = document.getElementById('salesforce-validations')

  if (!salesforce.getAttribute('EXPIRATION_DATE_TIME')) {
    console.log('Falta de atributos: EXPIRATION_DATE_TIME - dd/mm/aaaa hh:mm')
    return
  }

  if (!salesforce.getAttribute('FORM_ID')) {
    console.log('Falta de atributos: FORM_ID - ID da TAG form')
    return
  }

  if (!salesforce.getAttribute('FORM_SUBMIT_ID')) {
    console.log('Falta de atributos: FORM_SUBMIT_ID - ID do botão de envio')
    return
  }

  const EXPIRATION_DATE_TIME = salesforce.getAttribute('EXPIRATION_DATE_TIME') // A data que será indisponibilizado o formulário de inscrição
  const FORM_ID = salesforce.getAttribute('FORM_ID') // Coloque aqui o ID do FORM
  const FORM_SUBMIT_ID = salesforce.getAttribute('FORM_SUBMIT_ID') // Coloque aqui o ID do botão

  const EXPIRATION_MESSAGE = salesforce.getAttribute('EXPIRATION_MESSAGE')
    ? salesforce.getAttribute('EXPIRATION_MESSAGE')
    : 'Inscrições encerradas!'

  const EXPIRATION_FONT_COLOR = salesforce.getAttribute('EXPIRATION_FONT_COLOR')
    ? salesforce.getAttribute('EXPIRATION_FONT_COLOR')
    : '#000'

  const EXPIRATION_FONT_SIZE = salesforce.getAttribute('EXPIRATION_FONT_SIZE')
    ? salesforce.getAttribute('EXPIRATION_FONT_SIZE')
    : '24px'

  const EXPIRATION_BACKGROUND_COLOR = salesforce.getAttribute(
    'EXPIRATION_BACKGROUND_COLOR'
  )
    ? salesforce.getAttribute('EXPIRATION_BACKGROUND_COLOR')
    : 'rgba(246, 0,64, 0.5)'

  // OBS: Deixe o ID vazio caso o campo não exista no formulário EX: const EMAIL_ID = "";
  const EMAIL_ID = salesforce.getAttribute('EMAIL_ID')

  const CPF_ID = salesforce.getAttribute('CPF_ID') // Coloque aqui o ID do CPF

  const CNPJ_ID = salesforce.getAttribute('CNPJ_ID') // Coloque aqui o ID do CNPJ

  const TELEFONE_ID = salesforce.getAttribute('TELEFONE_ID') // Coloque aqui o ID do telefone

  // Mensagens de feedback
  const CPF_MESSAGE = salesforce.getAttribute('CPF_MESSAGE')
    ? salesforce.getAttribute('CPF_MESSAGE')
    : 'Atenção: CPF inválido.'

  const CPNJ_MESSAGE = salesforce.getAttribute('CPNJ_MESSAGE')
    ? salesforce.getAttribute('CPNJ_MESSAGE')
    : 'Atenção: CNPJ inválido.'

  const TELEFONE_MESSAGE = salesforce.getAttribute('TELEFONE_MESSAGE')
    ? salesforce.getAttribute('TELEFONE_MESSAGE')
    : 'Atenção: Telefone inválido.'

  const CONFIRMATION_MESSAGE = salesforce.getAttribute('CONFIRMATION_MESSAGE')
    ? salesforce.getAttribute('CONFIRMATION_MESSAGE')
    : 'Obrigado(a), a sua inscrição foi enviada.'

  // Validação de tempo de disponibilidade da LP
  if (document.getElementById(FORM_ID) && EXPIRATION_DATE_TIME) {
    const date =
      EXPIRATION_DATE_TIME.split('/')[1] +
      '/' +
      EXPIRATION_DATE_TIME.split('/')[0] +
      '/' +
      EXPIRATION_DATE_TIME.split('/')[2]
    if (new Date() >= new Date(date)) {
      const form = document.getElementById(FORM_ID)
      form.style.display = 'grid'
      form.style.alignItems = 'center'
      form.style.justifyItems = 'center'
      form.style.backgroundColor = EXPIRATION_BACKGROUND_COLOR
      form.style.borderRadius = '20px'
      form.style.padding = '10px 10px'
      form.innerHTML = `<div style="color: ${EXPIRATION_FONT_COLOR}; font-size: ${EXPIRATION_FONT_SIZE};">${EXPIRATION_MESSAGE}</div>`
    }
  }
  // Script para evitar colar no input de confirmação de email
  if (document.getElementById(EMAIL_ID))
    document.getElementById(EMAIL_ID).onpaste = () => {
      return false
    }
  // CPF MASK
  if (document.getElementById(CPF_ID))
    document.getElementById(CPF_ID).addEventListener('input', (event) => {
      if (
        event.target.value.length > 14 ||
        isNaN(event.target.value.substr(-1))
      )
        event.target.value = event.target.value.substring(
          0,
          event.target.value.length - 1
        )
      switch (event.target.value.length) {
        case 3:
          event.target.value += '.'
          break
        case 7:
          event.target.value += '.'
          break
        case 11:
          event.target.value += '-'
          break
      }
    })
  // CNPJ MASK
  if (document.getElementById(CNPJ_ID))
    document.getElementById(CNPJ_ID).addEventListener('input', (event) => {
      if (
        event.target.value.length > 18 ||
        isNaN(event.target.value.substr(-1))
      )
        event.target.value = event.target.value.substring(
          0,
          event.target.value.length - 1
        )
      switch (event.target.value.length) {
        case 2:
          event.target.value += '.'
          break
        case 6:
          event.target.value += '.'
          break
        case 10:
          event.target.value += '/'
          break
        case 15:
          event.target.value += '-'
          break
      }
    })
  // Telefone Mask
  if (document.getElementById(TELEFONE_ID))
    document.getElementById(TELEFONE_ID).addEventListener('input', (event) => {
      if (
        event.target.value.length > 20 ||
        isNaN(event.target.value.substr(-1))
      )
        event.target.value = event.target.value.substring(
          0,
          event.target.value.length - 1
        )
      switch (event.target.value.length) {
        case 2:
          event.target.value = '+55 (' + event.target.value + ') '
          break
        case 10:
          event.target.value += ' '
          break
        case 15:
          event.target.value += '-'
          break
      }
    })
  // Função que valida CPF
  const isValidCPF = (cpf) => {
    if (typeof cpf !== 'string') return false
    cpf = cpf.replace(/[\s.-]*/gim, '')
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if (resto == 10 || resto == 11) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if (resto == 10 || resto == 11) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) return false
    return true
  }
  // Função que valida CNPJ
  const isValidCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, '')
    if (cnpj == '') return false
    if (cnpj.length != 14) return false
    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      return false
    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho)
    let digitos = cnpj.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7
    let resultado = null
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--
      if (pos < 2) pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado != digitos.charAt(0)) return false
    tamanho = tamanho + 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--
      if (pos < 2) pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado != digitos.charAt(1)) return false
    return true
  }

  document.getElementById(FORM_ID).addEventListener('submit', (event) => {
    // Verificação do EMAIL - Removido, agora é feito através de um serviço externo

    // Verificação de CPF
    if (document.getElementById(CPF_ID) && CPF_ID) {
      let cpfInput = document.getElementById(CPF_ID)
      if (
        cpfInput.getAttribute('required') === null &&
        cpfInput.value.length === 0
      ) {
        // Campo não obrigatório
      } else if (!isValidCPF(cpfInput.value)) {
        event.preventDefault()
        cpfInput.value = ''
        alert(CPF_MESSAGE)
        return
      }
    }
    // Verificação de CNPJ
    if (document.getElementById(CNPJ_ID) && CNPJ_ID) {
      let cnpjInput = document.getElementById(CNPJ_ID)
      if (
        cnpjInput.getAttribute('required') === null &&
        cnpjInput.value.length === 0
      ) {
        // Campo não obrigatório
      } else if (!isValidCNPJ(cnpjInput.value)) {
        // Verificação de CNPJ
        event.preventDefault()
        cnpjInput.value = ''
        alert(CPNJ_MESSAGE)
        return
      }
    }
    // Removendo MASK do input de telefone e validando telefones inválidos
    if (document.getElementById(TELEFONE_ID) && TELEFONE_ID) {
      let telefoneInput = document.getElementById(TELEFONE_ID)
      let telefoneStr = String(telefoneInput.value)
        .split(')')[1]
        .replace(' ', '')
        .replace(' ', '')
        .replace('-', '')
      if (
        String(telefoneStr).includes('111111111') ||
        String(telefoneStr).includes('222222222') ||
        String(telefoneStr).includes('333333333') ||
        String(telefoneStr).includes('444444444') ||
        String(telefoneStr).includes('555555555') ||
        String(telefoneStr).includes('666666666') ||
        String(telefoneStr).includes('777777777') ||
        String(telefoneStr).includes('888888888') ||
        String(telefoneStr).includes('999999999') ||
        String(telefoneStr).includes('000000000')
      ) {
        alert(TELEFONE_MESSAGE)
        event.preventDefault()
        return
      }
      telefoneInput.value = String(telefoneInput.value)
        .replace('-', '')
        .replace('(', '')
        .replace('+', '')
        .replace(')', '')
        .replace(' ', '')
        .replace(' ', '')
        .replace(' ', '')
    }
    // Desabilitando botão
    if (document.getElementById(FORM_SUBMIT_ID)) {
      document.getElementById(FORM_SUBMIT_ID).disabled = true
    }
    alert(CONFIRMATION_MESSAGE)
  })

  // Lista de regionais e suas cidades
  const regionais = {
    CURITIBA: ['CURITIBA'],
    CENTRO: [
      'CARAMBEÍ',
      'CASTRO',
      'IPIRANGA',
      'JAGUARIAÍVA',
      'PALMEIRA',
      'PIRAÍ DO SUL',
      'PONTA GROSSA',
      'PORTO AMAZONAS',
      'SÃO JOÃO DO TRIUNFO',
      'SENGÉS',
      'BOA VENTURA DE SÃO ROQUE',
      'CAMPINA DO SIMÃO',
      'CÂNDIDO DE ABREU',
      'GUARAPUAVA',
      'LARANJAL',
      'MANOEL RIBAS',
      'MATO RICO',
      'NOVA TEBAS',
      'PALMITAL',
      'PITANGA',
      'SANTA MARIA DO OESTE',
      'TURVO',
      'ARAPOTI',
      'CURIÚVA',
      'IMBAÚ',
      'IVAÍ',
      'ORTIGUEIRA',
      'RESERVA',
      'TELÊMACO BORBA',
      'TIBAGI',
      'VENTANIA',
      'FERNANDES PINHEIRO',
      'GUAMIRANGA',
      'IMBITUVA',
      'INÁCIO MARTINS',
      'IRATI',
      'MALLET',
      'PRUDENTÓPOLIS',
      'REBOUÇAS',
      'RIO AZUL',
      'TEIXEIRA SOARES',
    ],
    LESTE: [
      'ALMIRANTE TAMANDARÉ',
      'ARAUCÁRIA',
      'BALSA NOVA',
      'CAMPINA GRANDE DO SUL',
      'CAMPO LARGO',
      'CAMPO MAGRO',
      'COLOMBO',
      'PINHAIS',
      'PIRAQUARA',
      'QUATRO BARRAS',
      'SÃO JOSÉ DOS PINHAIS',
      'AGUDOS DO SUL',
      'CAMPO DO TENENTE',
      'CONTENDA',
      'FAZENDA RIO GRANDE',
      'LAPA',
      'MANDIRITUBA',
      'PIÊN',
      'QUITANDINHA',
      'RIO NEGRO',
      'TIJUCAS DO SUL',
      'ANTONINA',
      'GUARAQUEÇABA',
      'GUARATUBA',
      'MATINHOS',
      'MORRETES',
      'PARANAGUÁ',
      'PONTAL DO PARANÁ',
      'ADRIANÓPOLIS',
      'BOCAIÚVA DO SUL',
      'CERRO AZUL',
      'DOUTOR ULYSSES',
      'ITAPERUÇU',
      'RIO BRANCO DO SUL',
      'TUNAS DO PARANÁ',
    ],
    NOROESTE: [
      'ALTO PARAÍSO',
      'ALTO PIQUIRI',
      'ALTÔNIA',
      'CAFEZAL DO SUL',
      'CRUZEIRO DO OESTE',
      'DOURADINA',
      'ESPERANÇA NOVA',
      'ICARAÍMA',
      'IPORÃ',
      'IVATÉ',
      'MARIA HELENA',
      'MARILUZ',
      'NOVA OLÍMPIA',
      'PEROBAL',
      'PÉROLA',
      'SÃO JORGE DO PATROCÍNIO',
      'TAPIRA',
      'UMUARAMA',
      'XAMBRÊ',
      'ALTAMIRA DO PARANÁ',
      'ARARUNA',
      'BARBOSA FERRAZ',
      'BOA ESPERANÇA',
      'CAMPINA DA LAGOA',
      'CAMPO MOURÃO',
      'CORUMBATAÍ DO SUL',
      'ENGENHEIRO BELTRÃO',
      'FAROL',
      'FÊNIX',
      'GOIOERÊ',
      'IRETAMA',
      'JANIÓPOLIS',
      'JURANDA',
      'LUIZIANA',
      'MAMBORÊ',
      'MOREIRA SALES',
      'NOVA CANTU',
      'PEABIRU',
      'QUARTO CENTENÁRIO',
      'QUINTA DO SOL',
      "RANCHO ALEGRE D'OESTE",
      'RONCADOR',
      'ALTO PARANÁ',
      'AMAPORÃ',
      'CRUZEIRO DO SUL',
      'DIAMANTE DO NORTE',
      'GUAIRAÇÁ',
      'INAJÁ',
      'ITAÚNA DO SUL',
      'JARDIM OLINDA',
      'LOANDA',
      'MARILENA',
      'MIRADOR',
      'NOVA ALIANÇA DO IVAÍ',
      'NOVA LONDRINA',
      'PARAÍSO DO NORTE',
      'PARANAPOEMA',
      'PARANAVAÍ',
      'PLANALTINA DO PARANÁ',
      'PORTO RICO',
      'QUERÊNCIA DO NORTE',
      'SANTA CRUZ DE MONTE CASTELO',
      'SANTA ISABEL DO IVAÍ',
      'SANTA MÔNICA',
      'SANTO ANTÔNIO DO CAIUÁ',
      'SÃO CARLOS DO IVAÍ',
      'SÃO JOÃO DO CAIUÁ',
      'SÃO PEDRO DO PARANÁ',
      'TAMBOARA',
      'TERRA RICA',
      'CIANORTE',
      'CIDADE GAÚCHA',
      'GUAPOREMA',
      'INDIANÓPOLIS',
      'JAPURÁ',
      'JUSSARA',
      'RONDON',
      'SÃO MANOEL DO PARANÁ',
      'SÃO TOMÉ',
      'TAPEJARA',
      'TERRA BOA',
      'TUNEIRAS DO OESTE',
      'ÂNGULO',
      'ASTORGA',
      'ATALAIA',
      'COLORADO',
      'DOUTOR CAMARGO',
      'FLORAÍ',
      'FLORESTA',
      'FLÓRIDA',
      'IGUARAÇU',
      'ITAGUAJÉ',
      'ITAMBÉ',
      'IVATUBA',
      'LOBATO',
      'MANDAGUAÇU',
      'MANDAGUARI',
      'MARIALVA',
      'MARINGÁ',
      'MUNHOZ DE MELLO',
      'NOSSA SENHORA DAS GRAÇAS',
      'NOVA ESPERANÇA',
      'OURIZONA',
      'PAIÇANDU',
      'PARANACITY',
      'PRESIDENTE CASTELO BRANCO',
      'SANTA FÉ',
      'SANTA INÊS',
      'SANTO INÁCIO',
      'SÃO JORGE DO IVAÍ',
      'SARANDI',
      'UNIFLOR',
    ],
    NORTE: [
      'ARAPONGAS',
      'BELA VISTA DO PARAÍSO',
      'CAMBÉ',
      'IBIPORÃ',
      'JATAIZINHO',
      'LONDRINA',
      'PITANGUEIRAS',
      'ROLÂNDIA',
      'SABÁUDIA',
      'SERTANÓPOLIS',
      'TAMARANA',
      'ABATIÁ',
      'ANDIRÁ',
      'BANDEIRANTES',
      'BARRA DO JACARÉ',
      'CAMBARÁ',
      'CARLÓPOLIS',
      'CONGONHINHAS',
      'CONSELHEIRO MAIRINCK',
      'FIGUEIRA',
      'GUAPIRAMA',
      'IBAITI',
      'ITAMBARACÁ',
      'JABOTI',
      'JACAREZINHO',
      'JAPIRA',
      'JOAQUIM TÁVORA',
      'JUNDIAÍ DO SUL',
      'PINHALÃO',
      'QUATIGUÁ',
      'RIBEIRÃO CLARO',
      'RIBEIRÃO DO PINHAL',
      'SALTO DO ITARARÉ',
      'SANTA AMÉLIA',
      'SANTANA DO ITARARÉ',
      'SANTO ANTÔNIO DA PLATINA',
      'SÃO JOSÉ DA BOA VISTA',
      'SIQUEIRA CAMPOS',
      'TOMAZINA',
      'WENCESLAU BRAZ',
      'ALVORADA DO SUL',
      'CAFEARA',
      'CENTENÁRIO DO SUL',
      'FLORESTÓPOLIS',
      'GUARACI',
      'JAGUAPITÃ',
      'LUPIONÓPOLIS',
      'MIRASELVA',
      'PORECATU',
      'PRADO FERREIRA',
      'PRIMEIRO DE MAIO',
      'ASSAÍ',
      'CORNÉLIO PROCÓPIO',
      'LEÓPOLIS',
      'NOVA AMÉRICA DA COLINA',
      'NOVA FÁTIMA',
      'NOVA SANTA BÁRBARA',
      'RANCHO ALEGRE',
      'SANTA CECÍLIA DO PAVÃO',
      'SANTA MARIANA',
      'SANTO ANTÔNIO DO PARAÍSO',
      'SÃO JERÔNIMO DA SERRA',
      'SÃO SEBASTIÃO DA AMOREIRA',
      'SAPOPEMA',
      'SERTANEJA',
      'URAÍ',
      'APUCARANA',
      'ARAPUÃ',
      'ARIRANHA DO IVAÍ',
      'BOM SUCESSO',
      'BORRAZÓPOLIS',
      'CALIFÓRNIA',
      'CAMBIRA',
      'CRUZMALTINA',
      'FAXINAL',
      'GODOY MOREIRA',
      'GRANDES RIOS',
      'IVAIPORÃ',
      'JANDAIA DO SUL',
      'JARDIM ALEGRE',
      'KALORÉ',
      'LIDIANÓPOLIS',
      'LUNARDELLI',
      'MARILÂNDIA DO SUL',
      'MARUMBI',
      'MAUÁ DA SERRA',
      'NOVO ITACOLOMI',
      'RIO BOM',
      'RIO BRANCO DO IVAÍ',
      'ROSÁRIO DO IVAÍ',
      'SÃO JOÃO DO IVAÍ',
      'SÃO PEDRO DO IVAÍ',
    ],
    OESTE: [
      'CAMPO BONITO',
      'CANDÓI',
      'CANTAGALO',
      'CATANDUVAS',
      'DIAMANTE DO SUL',
      'ESPIGÃO ALTO DO IGUAÇU',
      'FOZ DO JORDÃO',
      'GOIOXIM',
      'GUARANIAÇU',
      'IBEMA',
      'LARANJEIRAS DO SUL',
      'MARQUINHO',
      'NOVA LARANJEIRAS',
      'PINHÃO',
      'PORTO BARREIRO',
      'QUEDAS DO IGUAÇU',
      'RESERVA DO IGUAÇU',
      'RIO BONITO DO IGUAÇU',
      'TRÊS BARRAS DO PARANÁ',
      'VIRMOND',
      'ANAHY',
      'ASSIS CHATEAUBRIAND',
      'BOA VISTA DA APARECIDA',
      'BRAGANEY',
      'BRASILÂNDIA DO SUL',
      'CAFELÂNDIA',
      'CAPITÃO LEÔNIDAS MARQUES',
      'CASCAVEL',
      'CÉU AZUL',
      'CORBÉLIA',
      "DIAMANTE D'OESTE",
      'ENTRE RIOS DO OESTE',
      'FORMOSA DO OESTE',
      'FOZ DO IGUAÇU',
      'FRANCISCO ALVES',
      'GUAÍRA',
      'IGUATU',
      'IRACEMA DO OESTE',
      'ITAIPULÂNDIA',
      'JESUÍTAS',
      'LINDOESTE',
      'MARECHAL CÂNDIDO RONDON',
      'MARIPÁ',
      'MATELÂNDIA',
      'MEDIANEIRA',
      'MERCEDES',
      'MISSAL',
      'NOVA AURORA',
      'NOVA SANTA ROSA',
      'OURO VERDE DO OESTE',
      'PALOTINA',
      'PATO BRAGADO',
      'QUATRO PONTES',
      'RAMILÂNDIA',
      'SANTA HELENA',
      'SANTA LÚCIA',
      'SANTA TEREZA DO OESTE',
      'SANTA TEREZINHA DE ITAIPU',
      'SÃO JOSÉ DAS PALMEIRAS',
      'SÃO MIGUEL DO IGUAÇU',
      'SÃO PEDRO DO IGUAÇU',
      'SERRANÓPOLIS DO IGUAÇU',
      'TERRA ROXA',
      'TOLEDO',
      'TUPÃSSI',
      'UBIRATÃ',
      'VERA CRUZ DO OESTE',
    ],
    SUL: [
      'AMPÉRE',
      'BARRACÃO',
      'BELA VISTA DA CAROBA',
      'BOM JESUS DO SUL',
      'CAPANEMA',
      'FLOR DA SERRA DO SUL',
      'MANFRINÓPOLIS',
      "PÉROLA D'OESTE",
      'PINHAL DE SÃO BENTO',
      'PLANALTO',
      'PRANCHITA',
      'REALEZA',
      'SALGADO FILHO',
      'SANTA IZABEL DO OESTE',
      'SANTO ANTÔNIO DO SUDOESTE',
      'ANTÔNIO OLINTO',
      'BITURUNA',
      'CRUZ MACHADO',
      'GENERAL CARNEIRO',
      'PAULA FREITAS',
      'PAULO FRONTIN',
      'PORTO VITÓRIA',
      'SÃO MATEUS DO SUL',
      'UNIÃO DA VITÓRIA',
      'BOA ESPERANÇA DO IGUAÇU',
      'BOM SUCESSO DO SUL',
      'CHOPINZINHO',
      'CLEVELÂNDIA',
      'CORONEL DOMINGOS SOARES',
      'CORONEL VIVIDA',
      'CRUZEIRO DO IGUAÇU',
      'DOIS VIZINHOS',
      'ENÉAS MARQUES',
      'FRANCISCO BELTRÃO',
      'HONÓRIO SERPA',
      "ITAPEJARA D'OESTE",
      'MANGUEIRINHA',
      'MARIÓPOLIS',
      'MARMELEIRO',
      'NOVA ESPERANÇA DO SUDOESTE',
      'NOVA PRATA DO IGUAÇU',
      'PALMAS',
      'PATO BRANCO',
      'RENASCENÇA',
      'SALTO DO LONTRA',
      'SÃO JOÃO',
      "SÃO JORGE D'OESTE",
      'SAUDADE DO IGUAÇU',
      'SULINA',
      'VERÊ',
      'VITORINO',
    ],
  }

  if (salesforce.getAttribute('CIDADES_ID')) {
    // Recupera o elemento html das cidades
    const selectCities = document.getElementById(
      salesforce.getAttribute('CIDADES_ID')
    )
    selectCities.innerHTML += `<option value="">-- Selecione uma cidade --</option>`

    for (const key in regionais) {
      if (Object.hasOwnProperty.call(regionais, key)) {
        const cidades = regionais[key]
        cidades.forEach((cidade) => {
          selectCities.innerHTML += `<option value="${cidade}">${cidade}</option>`
        })
      }
    }

    if (salesforce.getAttribute('REGIONAL_ID')) {
      // De-para cidades-regionais
      const regional = document.getElementById(
        salesforce.getAttribute('REGIONAL_ID')
      )
      selectCities.addEventListener('input', () => {
        for (const key in regionais) {
          if (Object.hasOwnProperty.call(regionais, key)) {
            const cidades = regionais[key]
            const cidade = cidades.filter(
              (cidade) => selectCities.value == cidade
            )[0]

            if (cidade) {
              regional.value = key
              break
            }
          }
        }
      })
    }
  }
})
