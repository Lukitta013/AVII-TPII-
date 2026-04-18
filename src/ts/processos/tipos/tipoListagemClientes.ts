import Processo from "../../abstracoes/processo";
import MenuTipoListagemClientes from "../../menus/menuTipoListagemClientes";
import ListagemTitulares from "../listagem/listagemTitulares";
import ListagemDependentesPorTitular from "../listagem/listagemDependentesPorTitular"; 
import ListagemTitularPorDependente from "../listagem/listagemTitularPorDependente"; 

export default class TipoListagemClientes extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoListagemClientes()
        this.execucao = true
    }

    processar(): void {
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')

            switch (this.opcao) {
                case 1:
                    this.processo = new ListagemTitulares()
                    this.processo.processar()
                    break
                case 2:
                    this.processo = new ListagemDependentesPorTitular()
                    this.processo.processar()
                    break
                case 3:
                    this.processo = new ListagemTitularPorDependente()
                    this.processo.processar()
                    break
                case 0:
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida :(')
            }
        }
    }
}