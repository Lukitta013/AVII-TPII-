import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemDependentesPorTitular extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('Listagem de dependentes por titular...')
        let titulares = this.clientes.filter(
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
            '\nQual titular deseja ver os dependentes?'
        ) - 1
        if (indice < 0 || indice >= titulares.length) {
            console.log('Opção inválida.')
            return
        }
        let titularEscolhido = titulares[indice]
        if (titularEscolhido.Dependentes.length === 0) {
            console.log(`\n${titularEscolhido.Nome} não possui dependentes.`)
            return
        }
        console.log(`\nDependentes de ${titularEscolhido.Nome}:`)
        titularEscolhido.Dependentes.forEach((dep: Cliente) => {
            this.impressor = new ImpressaorCliente(dep)
            console.log(this.impressor.imprimir())
        })
    }
}