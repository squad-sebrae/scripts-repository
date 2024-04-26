# scripts-repository

Repositório de scripts uteis para uso exclusivo do SEBRAE

# Salesforce

## Links Uteis

### Script de validação e integração

    https://squad-sebrae.github.io/scripts-repository/salesforce/valida-salesforce.min.js

##### Exemplo de uso na página

    <!-- JS de validações -->
    <script
        src="https://squad-sebrae.github.io/scripts-repository/salesforce/valida-salesforce.min.js"
        id="salesforce-validations"
        EXPIRATION_DATE_TIME="01/01/2099 00:00"
        FORM_ID="SubmitForm"
        FORM_SUBMIT_ID="enviar"
        CIDADES_ID="cidade"
        REGIONAL_ID="regional"
        EXPIRATION_MESSAGE="Inscrições encerradas!"
        EXPIRATION_FONT_COLOR="#000"
        EXPIRATION_FONT_SIZE="24px"
        EXPIRATION_BACKGROUND_COLOR="rgba(246, 0,64, 0.5)"
        EMAIL_ID="email"
        CPF_ID="cpf"
        CNPJ_ID="cnpj"
        TELEFONE_ID="celular"
        CPF_MESSAGE="Atenção: CPF inválido."
        CPNJ_MESSAGE="Atenção: CNPJ inválido."
        TELEFONE_MESSAGE="Atenção: Telefone inválido."
        CONFIRMATION_MESSAGE="Obrigado(a), a sua inscrição foi enviada."
        SECAO_CPF=""
        ESTRANGEIRO_ID=""
        BCS_INTEGRATION="false">
    /**
     * id: Manter sempre o valor padrão: salesforce-validations
     * EXPIRATION_DATE_TIME: A data que será indisponibilizado o formulário de inscrição
     * FORM_ID: ID do FORM
     * FORM_SUBMIT_ID: Coloque aqui o ID do botão
     * CIDADES_ID: ID do input de cidades
     * REGIONAL_ID: ID do input de regional
     * EXPIRATION_MESSAGE: Mensagem que será exibida quando o prazo da LP expirar
     * EXPIRATION_FONT_COLOR: Cor da fonte da mensagem de expiração
     * EXPIRATION_FONT_SIZE: Tamanho da fonte da mensagem de expiração
     * EXPIRATION_BACKGROUND_COLOR: Cor de fundo da mensagem de expiração
     * EMAIL_ID: ID do input de email
     * CPF_ID: ID do input de CPF
     * CNPJ_ID: ID do input de CNPJ
     * TELEFONE_ID: ID do input de telefone
     * CPF_MESSAGE: Mensagem de erro de CPF
     * CPNJ_MESSAGE: Mensagem de erro de CNPJ
     * TELEFONE_MESSAGE: Mensagem de erro no telefone
     * CONFIRMATION_MESSAGE: Mensagem de confirmação. Remova caso não queira que exiba o "alert" de obrigado no final do formulário.
     * SECAO_CPF: ID DIV que envolve o CPF. Oculta o CPF em caso de estrangeiro.
     * ESTRANGEIRO_ID: ID do campo checkbox que fala se o agente é estrangeiro ou não.
     * BCS_INTEGRATION: Se true envia os dados para BCS
     *
     * OBS: Caso algum campo não seja necessário remover a referência do script e o HTML
     */
    </script>

### Icones

    https://squad-sebrae.github.io/scripts-repository/salesforce/AF_icone_baixo.svg

### Fontes

campuni-regular

    https://squad-sebrae.github.io/scripts-repository/salesforce/campuni-font/campuni-regular.ttf

campuni-book

    https://squad-sebrae.github.io/scripts-repository/salesforce/campuni-font/campuni-book.ttf

campuni-bold

    https://squad-sebrae.github.io/scripts-repository/salesforce/campuni-font/campuni-bold.ttf

campuni-black

    https://squad-sebrae.github.io/scripts-repository/salesforce/campuni-font/campuni-black.ttf
