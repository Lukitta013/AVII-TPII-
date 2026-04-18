import Processo from "../../abstracoes/processo";   
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Telefone from "../../modelos/telefone";
import Cliente from "../../modelos/cliente";

export default class CadastrarTelefoneCliente extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        console.log('Coletando os dados do telefone...')
        let ddd = this.entrada.receberTexto('Qual o DDD do telefone?')
        let numero = this.entrada.receberTexto('Qual o número do telefone?')
        let telefone = new Telefone(ddd, numero)
        this.cliente.Telefones.push(telefone)
    }
}   