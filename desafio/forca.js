/**
 * Este programa serve como a estrutura para interagir no desafio.js
 * 
 * @author Arthur Antonello
 * @version 22.07.2022, Desafio para a seleção do StartDB
 */

const validarEtapa = require("../validacao/validar-etapa");

class Forca {
  //Construtor da classe Forca, recebe a palavra e inicializa os atributos com parâmetros iniciais
  constructor(secreta){
    console.clear(); //Limpa o console
    this.letrasChutadas = []; //Inicializa letrasChutadas como Array
    this.vidas = 6; //Vidas iniciais = 6
    this.palavraSecreta = secreta.split(""); //Inicializa a palavra secreta, com separador
    this.palavra = [""]; //Inicializa palavra como Array
    this.palavras(); //Executa o método palavras
  }

  //Método para chutar uma letra no jogo
  chutar(letra) {
    if (!this.validar(letra)){ //Verifica se o chute é válido
      return false;
    }else{
      letra = letra.toLowerCase(); //Transforma a letra chutada em letra minúscula
      if (this.letrasChutadas.includes(letra)){// Verifica se a letra já foi chutada anteriormente
        console.log (`
    =====
    Letra já informada!
    =====
    `);
      }else{
        this.letrasChutadas.push(letra); //Inclui a letra chutada no histórico de chutes
        if (!this.palavraSecreta.includes(letra)){ //Verifica se a letra não possui ou possui na palavra secreta
          this.vidas--;
        }else{
          this.acertou(letra); //Executa o método de acerto
        }
      }
    }
   }

  //Checa para ver se o jogador ganhou ou perdeu
  buscarEstado() { 
    if(this.vidas == 0){ //Verifica se a vida está zerada
      return "perdeu";
    }else{
      if (!this.palavra.includes("_") && this.vidas > 0){ //Verifica se há alguma lacuna em branco e se a vida é maior que zero
        return "ganhou"
      }
    } 
  }

  //Busca e printa o status atual do jogo após cada jogada
  buscarDadosDoJogo() {
    return(`
    Vidas: ${this.vidas}                  Chutes: ${this.letrasChutadas}

               Palavra:  ${this.palavra} 

       ==============================================
    `);
  }

  //Busca os dados brutos, útil para acertou de retorno
  buscarDadosBrutos() {
    console.clear();
    return {
      letrasChutadas: this.letrasChutadas,
      vidas: this.vidas,
      palavraSecreta: this.palavraSecreta,
      palavra: this.palavra,
    }  
  }
    
  //Cria os espaços em branco de acordo com o tamanho da palavra secreta
  palavras(){
    for(let i = 0; i < this.palavraSecreta.length; i++){
      this.palavra[i] = "_";
    }
  }

  //Método para alocar a letra na posição secreta correta
  acertou(letra){
    for(let i = 0; i < this.palavraSecreta.length; i++){
      if(letra == this.palavraSecreta[i]){
        this.palavra[i] = letra;
      }
    }
  }

  //Validações
  validar(letra){
    //Se o input está dentre as letras do alfabeto
    if(!/[a-z]/i.test(letra)){
      console.log(`
      =====
      Por favor, chute apenas letras.
      =====
      `);
      return false;
    }

    //Se o input não é null
    if (letra == null){
      console.log(`
      =====
      Por favor, chute apenas uma letra.
      =====
      `);
      return false;
    }

    //Se o input é apenas um caractere
    if (letra.length > 1){
      console.log(`
      =====
      Por favor, chute apenas uma letra por vez.
      =====
      `);
      return false;
    }
    return true;
  }
}

module.exports = Forca;
