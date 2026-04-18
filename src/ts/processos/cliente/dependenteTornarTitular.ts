import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";

export default class DependenteTornarTitular extends Processo {
    processar(): void {
        console.clear()
        console.log('=== Tornar dependente em titular ===')

        let armazem = Armazem.InstanciaUnica
        let dependentes = armazem.Clientes.filter(
            (c: Cliente) => c.Titular !== undefined
        )
        if (dependentes.length === 0) {
            console.log('Nenhum dependente cadastrado.')
            return
        }
        console.log('\nDependentes cadastrados:')
        dependentes.forEach((dep, index) => {
            console.log(`${index + 1} - ${dep.Nome} (Titular atual: ${dep.Titular?.Nome})`)
        })
        let indice = this.entrada.receberNumero(
            '\nQual dependente deseja tornar titular?'
        ) - 1
        if (indice < 0 || indice >= dependentes.length) {
            console.log('Opção inválida.')
            return
        }
        let dependente = dependentes[indice]
        let titularAtual = dependente.Titular!
        console.log(`\n Atenção!`)
        console.log(`${dependente.Nome} será desvinculado de ${titularAtual.Nome}`)
        console.log(`e passará a ser um cliente titular independente.`)

        let confirmacao = this.entrada.receberTexto(
            '\nConfirma a operação? (s/n)'
        )
        if (confirmacao.toLowerCase() !== 's') {
            console.log('Operação cancelada.')
            return
        }
        titularAtual.removerDependente(dependente)
        dependente.Titular = undefined
        console.log(`\n ${dependente.Nome} agora é um cliente titular!`)
        console.log(`Seus documentos, endereço e telefones foram mantidos.`)
    }
}