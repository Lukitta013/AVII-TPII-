import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemTitularPorDependente extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.clear()
        console.log('Listagem do titular por dependente...')

        let dependentes = this.clientes.filter(
            (c: Cliente) => c.Titular !== undefined
        )
        if (dependentes.length === 0) {
            console.log('Nenhum dependente cadastrado.')
            return
        }
        console.log('\nDependentes cadastrados:')
        dependentes.forEach((dep, index) => {
            console.log(`${index + 1} - ${dep.Nome}`)
        })
        let indice = this.entrada.receberNumero(
            '\nQual dependente deseja ver o titular?'
        ) - 1
        if (indice < 0 || indice >= dependentes.length) {
            console.log('Opção inválida.')
            return
        }
        let dependenteEscolhido = dependentes[indice]
        let titular = dependenteEscolhido.Titular!
        console.log(`\nTitular de ${dependenteEscolhido.Nome}:`)
        this.impressor = new ImpressaorCliente(titular)
        console.log(this.impressor.imprimir())
    }
}