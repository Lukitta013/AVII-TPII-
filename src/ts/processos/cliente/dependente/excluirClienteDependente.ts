import Processo from "../../../abstracoes/processo";
import Armazem from "../../../dominio/armazem";
import Cliente from "../../../modelos/cliente";

export default class ExcluirClienteDependente extends Processo {
    processar(): void {
        console.log('Iniciando a exclusão de um dependente...')
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
        let indice = this.entrada.receberNumero('Qual dependente deseja excluir?') - 1

        if (indice < 0 || indice >= dependentes.length) {
            console.log('Opção inválida.')
            return
        }
        let dependente = dependentes[indice]
        let titular = dependente.Titular!
        titular.removerDependente(dependente)
        let indexNoArmazem = armazem.Clientes.indexOf(dependente)
        armazem.Clientes.splice(indexNoArmazem, 1)

        console.log(`Dependente ${dependente.Nome} excluído com sucesso!`)
    }
}