(function($) {
  'use strict';
  // o window.DOM foi importado com o nome $

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */
var app = (function appController() {
  return {
    init: function init () {
      this.companyInfo();
      this.initEvents();
      this.removeCar();
    },

    initEvents: function initEvents() {
      $('[data-js="form-register"]').on('submit', this.handleSubmit);
    },

    handleSubmit: function handleSubmit(e) {
      e.preventDefault();
      var $tableCar = $('[data-js="table-car"]').get();
      $tableCar.appendChild(app.createNewCar());
    },

    createNewCar: function createNewCar() {
      var $fragment = document.createDocumentFragment();
      var $tr = document.createElement('tr');
      $tr.setAttribute('data-js', 'item-car');
      var $button = document.createElement('a');
      $button.className = 'btn-floating waves-effect waves-light red';
      $button.setAttribute('data-js', 'btn-remove');
      var $icon = document.createElement('i');
      $icon.className = 'material-icons';
      var $tdImage = document.createElement('td');
      var $image = document.createElement('img');
      var $tdBrand = document.createElement('td');
      var $tdYear = document.createElement('td');
      var $tdPlate = document.createElement('td');      
      var $tdColor = document.createElement('td');
      var $tdRemove = document.createElement('td');

      $image.setAttribute('src', $('[data-js="image"]').get().value)
      $tdImage.appendChild($image);

      $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
      $tdYear.textContent = $('[data-js="year"]').get().value;
      $tdPlate.textContent = $('[data-js="plate"]').get().value;
      $tdColor.textContent = $('[data-js="color"]').get().value;

      $icon.textContent = 'no_sim';
      
      $button.appendChild($icon);
      $tdRemove.appendChild($button);     

      $tr.appendChild($tdImage);
      $tr.appendChild($tdBrand);
      $tr.appendChild($tdYear);
      $tr.appendChild($tdPlate);
      $tr.appendChild($tdColor);
      $tr.appendChild($tdRemove);

      return $fragment.appendChild($tr);
    },

    companyInfo: function companyInfo() {
      var ajax = new XMLHttpRequest();
      ajax.open('GET','company.json', true);
      ajax.send();
      ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
    },

    getCompanyInfo: function getCompanyInfo() {
      if(!app.isReady.call(this))
        return;

        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
    },

    isReady: function isReady() {
      return this.readyState === 4 && this.status === 200;
    },

    removeCar: function removeCar() {
      var $btnRemove = document.querySelector('[data-js="table-car"]');
      $btnRemove.addEventListener('click', function() {
        var $itemCar = document.querySelector('[data-js="item-car"]');
        $itemCar.remove();
      }, false);
    }

  };
})();

app.init();
})(window.DOM);

/*
Agora vamos criar a funcionalidade de "remover" um carro. Adicione uma nova
coluna na tabela, com um botão de remover.

Ao clicar nesse botão, a linha da tabela deve ser removida.

Faça um pull request no seu repositório, na branch `challenge-31`, e cole
o link do pull request no `console.log` abaixo.

Faça um pull request, também com a branch `challenge-31`, mas no repositório
do curso, para colar o link do pull request do seu repo.
*/