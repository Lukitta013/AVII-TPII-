import Processo from "../../abstracoes/processo";
import MenuTipoCadastroCliente from "../../menus/menuTipoCadastroCliente";
import ExcluirClienteTitular from "../cliente/titular/excluirClienteTitular"; 
import ExcluirClienteDependente from "../cliente/dependente/excluirClienteDependente";

export default class TipoExclusaoCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoCadastroCliente()
        this.execucao = true
    }

    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')

        switch (this.opcao) {
            case 1:
                this.processo = new ExcluirClienteTitular()
                this.processo.processar()
                break
            case 2:
                this.processo = new ExcluirClienteDependente()
                this.processo.processar()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}