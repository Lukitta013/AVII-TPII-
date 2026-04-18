import Processo from "../../../abstracoes/processo";
import Armazem from "../../../dominio/armazem";
import Cliente from "../../../modelos/cliente";

export default class AtualizarClienteDependente extends Processo {
    processar(): void {
        console.log('Iniciando a atualização de um dependente...')
        let armazem = Armazem.InstanciaUnica
        let dependentes = armazem.Clientes.filter(
            (c: Cliente) => c.Titular !== undefined
        )

        if (dependentes.length === 0) {
            console.log('Nenhum dependente cadastrado.')
            return
        }
        console.log('Dependentes cadastrados:')
        dependentes.forEach((dep, index) => {
            console.log(`${index + 1} - ${dep.Nome} (Titular: ${dep.Titular?.Nome})`)
        })

        let indice = this.entrada.receberNumero('Qual dependente deseja atualizar?') - 1

        if (indice < 0 || indice >= dependentes.length) {
            console.log('Opção inválida.')
            return
        }

        let dependente = dependentes[indice]

        console.log(`\nDeixe em branco para manter o valor atual.`)

        let novoNome = this.entrada.receberTexto(
            `Novo nome (atual: ${dependente.Nome}):`
        )
        let novoNomeSocial = this.entrada.receberTexto(
            `Novo nome social (atual: ${dependente.NomeSocial}):`
        )
        if (novoNome.trim() !== '') dependente.Nome = novoNome
        if (novoNomeSocial.trim() !== '') dependente.NomeSocial = novoNomeSocial

        console.log('Dependente atualizado com sucesso!')
    }
}