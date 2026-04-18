import Processo from "../../../abstracoes/processo";
import Armazem from "../../../dominio/armazem";
import Cliente from "../../../modelos/cliente";

export default class AtualizarClienteTitular extends Processo {
    processar(): void {
        console.clear()
        console.log('Iniciando a atualização de um titular...')

        let armazem = Armazem.InstanciaUnica

        let titulares = armazem.Clientes.filter(
            (c: Cliente) => c.Titular === undefined
        )

        if (titulares.length === 0) {
            console.log('Nenhum titular cadastrado.')
            return
        }

        console.log('\nTitulares cadastrados:')
        titulares.forEach((tit, index) => {
            console.log(`${index + 1} - ${tit.Nome}`)
        })

        let indice = this.entrada.receberNumero(
            '\nQual titular deseja atualizar?'
        ) - 1

        if (indice < 0 || indice >= titulares.length) {
            console.log('Opção inválida.')
            return
        }

        let titular = titulares[indice]

        console.log('\nDeixe em branco para manter o valor atual.')

        let novoNome = this.entrada.receberTexto(
            `Novo nome (atual: ${titular.Nome}):`
        )
        let novoNomeSocial = this.entrada.receberTexto(
            `Novo nome social (atual: ${titular.NomeSocial}):`
        )

        if (novoNome.trim() !== '') titular.Nome = novoNome
        if (novoNomeSocial.trim() !== '') titular.NomeSocial = novoNomeSocial

        console.log('\nTitular atualizado com sucesso!')
    }
}