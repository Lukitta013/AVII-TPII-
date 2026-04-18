import Processo from "../../../abstracoes/processo";
import Armazem from "../../../dominio/armazem";
import Cliente from "../../../modelos/cliente";

export default class ExcluirClienteTitular extends Processo {
    processar(): void {
        console.clear()
        console.log('Iniciando a exclusão de um titular...')

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
            console.log(
                `${index + 1} - ${tit.Nome} (${tit.Dependentes.length} dependente(s))`
            )
        })

        let indice = this.entrada.receberNumero(
            '\nQual titular deseja excluir?'
        ) - 1

        if (indice < 0 || indice >= titulares.length) {
            console.log('Opção inválida.')
            return
        }

        let titular = titulares[indice]

        console.log(`\n  Atenção!`)
        console.log(`Excluir ${titular.Nome} irá remover também`)
        console.log(`os ${titular.Dependentes.length} dependente(s) vinculado(s).`)

        let confirmacao = this.entrada.receberTexto(
            '\nConfirma a exclusão? (s/n)'
        )

        if (confirmacao.toLowerCase() !== 's') {
            console.log('Operação cancelada.')
            return
        }
        titular.Dependentes.forEach((dep: Cliente) => {
            let indexDep = armazem.Clientes.indexOf(dep)
            if (indexDep !== -1) armazem.Clientes.splice(indexDep, 1)
        })
        let indexTitular = armazem.Clientes.indexOf(titular)
        armazem.Clientes.splice(indexTitular, 1)
        console.log(`\n ${titular.Nome} e seus dependentes foram excluídos!`)
    }
}