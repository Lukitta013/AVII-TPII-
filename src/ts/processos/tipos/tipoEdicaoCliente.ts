import Processo from "../../abstracoes/processo";
import MenuTipoCadastroCliente from "../../menus/menuTipoCadastroCliente";
import AtualizarClienteTitular from "../cliente/titular/atualizarClienteTitular";
import AtualizarClienteDependente from "../cliente/dependente/atualizarClienteDependente";

export default class TipoEdicaoCliente extends Processo {
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
                this.processo = new AtualizarClienteTitular()
                this.processo.processar()
                break
            case 2:
                this.processo = new AtualizarClienteDependente()
                this.processo.processar()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}