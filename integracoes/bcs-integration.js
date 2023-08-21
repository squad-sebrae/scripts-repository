window.addEventListener('DOMContentLoaded', function () {
  const url = window.location.pathname

  if (url.indexOf('feiradoempreendedor') !== -1) {
    document.getElementById('SubmitForm').addEventListener(
      'submit',
      async (event) => {
        try {
          const data = [...new FormData(event.target).entries()]
          const urlBCS = 'https://hom-mstorage-apps.pr.sebrae.com.br/sync/bcs'

          const body = {
            id_edicao: 1,
            linguagem: 'portugues',
            nome_completo: undefined,
            nome_cracha: undefined,
            email: undefined,
            cargo: 'Participante',
            cpf: undefined,
            celular: undefined,
            cidade: undefined,
            cnpj: undefined,
          }

          data.forEach((elements) => {
            const key = elements[0]
            const value = elements[1]

            switch (key) {
              case 'nome':
                body.nome_completo = value
                body.nome_cracha = value
                break
              case 'email':
                body.email = value
                break
              case 'cpf':
                body.cpf = value
                break
              case 'celular':
                body.celular = value
                break
              case 'cnpj':
                body.cnpj = value
                break
              case 'cidade':
                body.cidade = value
                break
              default:
                break
            }
          })

          if (
            body.nome_completo &&
            body.nome_cracha &&
            body.email &&
            body.cpf &&
            body.celular &&
            body.cidade
          ) {
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Origin: 'https://www.sebraepr.com.br',
              },
              body: JSON.stringify(body),
            }

            const response = await fetch(urlBCS, options)

            if (response.status !== 200) {
              event.preventDefault()
              this.alert('Erro de conexão, tente novamente mais tarde.')
              return
            }

            console.log('Integração com a BCS concluída')
          }
        } catch (error) {
          console.log('Erro ao integrar com a BCS', error)
        }
      },
      true
    )
  }
})
